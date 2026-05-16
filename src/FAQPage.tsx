import { useState } from 'react'

export default function FAQPage() {
  function FAQPage() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

  const faqItems = [
    {
      question: 'Was ist diese App?',
      answer:
        'Diese App ist eine soziale Plattform, auf der du dein Profil personalisieren und Interessen teilen kannst.',
    },

    {
      question: 'Wie funktioniert die Profiltiefe?',
      answer:
        'Deine Antworten auf Interessen werden analysiert und mit Sternen bewertet. Persönlichere Antworten erhöhen deine Profiltiefe.',
    },

    {
      question: 'Kann ich meinen Charakter ändern?',
      answer:
        'Ja. Unter „Charakter“ kannst du Kleidung, Haare und weitere Dinge anpassen.',
    },

    {
      question: 'Was sind Lieblingsdinge?',
      answer:
        'Das ist ein kleines Fun-Feature. Du kannst deine Lieblingsitems auswählen und auf deinem Profil anzeigen.',
    },

    {
      question: 'Wer kann mein Profil sehen?',
      answer:
        'Aktuell können andere Nutzer dein öffentliches Profil NICHT sehen.',
    },

    {
      question: 'Kann ich Dinge später ändern?',
      answer:
        'Ja, fast alles auf deinem Profil kann jederzeit bearbeitet werden.',
    },
  ]

  const toggleQuestion = (index: number) => {
    setOpenQuestion(prev => (prev === index ? null : index))
  }

  return (
    <div className="faq-page">

      <h1 className="faq-title gradient-text">
        Frequently Asked Questions <span>(Häufig gestellte Fragen)</span>
      </h1>

      <div className="faq-container">

        {faqItems.map((item, index) => (
          <div
            key={index}
            className="faq-item"
          >

            <button
              className="faq-question"
              onClick={() => toggleQuestion(index)}
            >
              <span>{item.question}</span>

              <span className="faq-symbol">
                {openQuestion === index ? '−' : '+'}
              </span>
            </button>

            {openQuestion === index && (
              <div className="faq-answer">
                {item.answer}
              </div>
            )}

          </div>
        ))}

      </div>
    </div>
  )
}

  return <FAQPage />

}