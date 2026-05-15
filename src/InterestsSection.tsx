import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import type { Question } from './InterestTypes'
import { analyzeAnswer } from './lib/analyzeAnswer'

import starIcon from './assets/star.png'

interface Props {
    user: any
    editIcon: string
}

function getAuthenticityLevel(score: number) {
    if (score <= 1) return 'verschlossen'
    if (score <= 2) return 'vorsichtig offen'
    if (score <= 3) return 'authentisch'
    if (score <= 4) return 'ausdrucksstark'

    return 'sehr tiefgründig'
}

export default function InterestsSection({ user, editIcon }: Props) {
    const [questions, setQuestions] = useState<Question[]>([])

    const [answers, setAnswers] = useState<
        Record<number, { answer: string; score: number }>
    >({})

    const [showModal, setShowModal] = useState(false)
    const [activeQuestion, setActiveQuestion] = useState<Question | null>(null)
    const [tempAnswer, setTempAnswer] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return

            // Fetch questions
            const { data: qData, error: qError } = await supabase
                .from('questions')
                .select('*')
                .order('created_at', { ascending: true })

            if (!qError && qData) {
                setQuestions(qData)
            }

            // Fetch answers
            const { data: aData, error: aError } = await supabase
                .from('answers')
                .select('question_id, answer, score')
                .eq('user_id', user.id)

            if (!aError && aData) {
                const acc: Record<number, { answer: string; score: number }> = {}

                aData.forEach((row: any) => {
                    acc[row.question_id] = {
                        answer: row.answer,
                        score: row.score ?? 0 // Default to 0 if score is null
                    }
                })

                setAnswers(acc)
            }
        }

        fetchData()
    }, [user])

    const handleSave = async () => {
        // Ensure user and activeQuestion are available and have IDs
        if (!user || !user.id || !activeQuestion || !activeQuestion.id) {
            console.error('Missing user or active question data for saving interest.');
            return;
        }

        const score = analyzeAnswer(tempAnswer)
        console.log('Calculated authenticity score:', score); // Debugging line

        const { error } = await supabase
            .from('answers')
            .upsert(
                {
                    user_id: user.id,
                    question_id: activeQuestion.id,
                    answer: tempAnswer,
                    score
                },
                {
                    onConflict: 'user_id,question_id'
                }
            )

        if (!error) {
            setAnswers(prev => ({
                ...prev,
                [activeQuestion.id]: {
                    answer: tempAnswer,
                    score
                }
            }))

            setShowModal(false)
        } else {
            console.error('Error saving interest answer:', error)
            alert('Fehler beim Speichern der Antwort.')
        }
    }

    return (
        <>
            <section className="gallery" aria-label="Gallery of tiles">
                {questions.map((q, i) => {
                    const currentAnswer = answers[q.id]
                    const authenticityLevel = currentAnswer
                        ? getAuthenticityLevel(currentAnswer.score)
                        : ''

                    const colorIndex = (i % 12) + 1

                    return (
                        <div
                            key={q.id}
                            className={`tile tile-${colorIndex} interest-tile`}
                        >
                            <span className="interest-question">{q.question}</span>

                            {currentAnswer ? (
                                <div
                                    className="interest-display"
                                    style={{ flexDirection: 'column', gap: '2px' }}
                                    onClick={() => {
                                        setActiveQuestion(q)
                                        setTempAnswer(currentAnswer.answer)
                                        setShowModal(true)
                                    }}
                                >
                                    <span style={{ marginBottom: '8px' }}>"{currentAnswer.answer}"</span>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div className="answer-stars">
                                            {Array.from({ length: currentAnswer.score }).map((_, index) => (
                                                <img
                                                    key={index}
                                                    src={starIcon}
                                                    alt="star"
                                                    className="star-icon"
                                                />
                                            ))}
                                        </div>
                                        <p className="authenticity-level">
                                            ({authenticityLevel})
                                        </p>
                                        <button className="edit-button" style={{ marginLeft: '4px' }}>
                                            <img
                                                src={editIcon}
                                                alt="edit"
                                                className="edit-icon"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    className="enter-answer-btn"
                                    onClick={() => {
                                        setActiveQuestion(q)
                                        setTempAnswer('')
                                        setShowModal(true)
                                    }}
                                >
                                    antwort eingeben
                                </button>
                            )}
                        </div>
                    )
                })}
            </section>

            {showModal && activeQuestion && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{activeQuestion.question}</h3>

                        <textarea
                            className="modal-textarea"
                            value={tempAnswer}
                            onChange={(e) => setTempAnswer(e.target.value)}
                            placeholder="Schreibe hier deine Antwort mit Begründung..."
                        />

                        <div className="modal-buttons">
                            <button className="modal-btn save" onClick={handleSave}>
                                Speichern
                            </button>

                            <button
                                className="modal-btn cancel"
                                onClick={() => setShowModal(false)}
                            >
                                Abbrechen
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}