import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import './PublicProfile.css'

import Character from './Character'
import { DRINKS, FLOWERS, SOCIALS } from './Items'

function PublicProfile() {

    const { username } = useParams()
    const navigate = useNavigate()

    const [interests, setInterests] = useState<any[]>([])
    const [profileData, setProfileData] = useState<any>(null)


    useEffect(() => {

        const fetchProfile = async () => {

            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('username', username)
                .maybeSingle()

            if (!data) return

            setProfileData(data)

            const { data: interestData } = await supabase
                .from('interests')
                .select('*')
                .eq('user_id', data.id)

            setInterests(interestData || [])
        }

        fetchProfile()

    }, [username])

    if (!profileData) {
        return <div>loading...</div>
    }

    return (

        <div className="public-profile-page">

            <div className="public-profile-card">

                {/* HEADER */}
                <div className="public-profile-header">

                    <div className="public-profile-left">
                        <Character
                            gender={profileData?.gender || 'female'}
                            topIndex={profileData?.top_index || 0}
                            bottomIndex={profileData?.bottom_index || 0}
                            hairIndex={profileData?.hair_index || 0}
                            shoeIndex={profileData?.shoe_index || 0}
                        />
                    </div>

                    {/* USER INFO */}
                    <div className="public-profile-right">

                        <h1>
                            @{profileData?.username}
                        </h1>

                        <p className="public-short-desc">
                            {profileData?.short_description || 'keine beschreibung'}
                        </p>

                        <div className="public-depth">

                            <span>
                                Profiltiefe
                            </span>

                            <div className="public-stars">
                                {'★'.repeat(
                                    Math.round(profileData?.average_score || 0)
                                )}
                            </div>

                        </div>

                    </div>

                    {/* ABOUT */}
                    <div className="public-about-box">

                        <h2>
                            Über mich
                        </h2>

                        <p>
                            {profileData?.about_me || 'keine bio vorhanden'}
                        </p>

                    </div>

                </div>

                {/* FAVORITES */}
                <section className="public-section">

                    <h2>Lieblingsdinge</h2>

                    <div className="public-favorites-grid">

                        <div className="public-favorite-card">

                            <span>Lieblingsgetränk</span>

                            {profileData?.fav_drink ? (
                                <img
                                    src={
                                        DRINKS.find(
                                            i => i.id === profileData.fav_drink
                                        )?.img
                                    }
                                    className="public-favorite-img"
                                />
                            ) : (
                                <div className="public-none">none</div>
                            )}

                        </div>

                        <div className="public-favorite-card">

                            <span>Lieblingsblume</span>

                            {profileData?.fav_flower ? (
                                <img
                                    src={
                                        FLOWERS.find(
                                            i => i.id === profileData.fav_flower
                                        )?.img
                                    }
                                    className="public-favorite-img"
                                />
                            ) : (
                                <div className="public-none">none</div>
                            )}

                        </div>

                        <div className="public-favorite-card">

                            <span>Lieblingssocial</span>

                            {profileData?.fav_social ? (
                                <img
                                    src={
                                        SOCIALS.find(
                                            i => i.id === profileData.fav_social
                                        )?.img
                                    }
                                    className="public-favorite-img social-icon"
                                />
                            ) : (
                                <div className="public-none">none</div>
                            )}

                        </div>

                    </div>

                </section>

                {/* INTERESTS */}
                <section className="public-section">

                    <h2>Interessen</h2>

                    <div className="public-interests-wrapper">

                        {/* FIRST ROW */}
                        <div className="public-interest-grid">

                            <div className="public-interest-card">
                                <h3>Zukunft</h3>
                                <p>Was ist dein größter Traum?</p>
                            </div>

                            <div className="public-interest-card">
                                <h3>Hypothetisch</h3>
                                <p>Was würdest du tun, wenn Zeit keine Rolle spielt?</p>
                            </div>

                            <div className="public-interest-card">
                                <h3>Reisen</h3>
                                <p>Wo würdest du gerne hinreisen?</p>
                            </div>

                            <div className="public-interest-card">
                                <h3>Geld</h3>
                                <p>Was würdest du mit 100.000 Euro machen?</p>
                            </div>

                        </div>

                        {/* SECOND ROW */}
                        <div className="public-interest-row-wrapper">

                            <div className="public-interest-grid faded-row">

                                <div className="public-interest-card">
                                    <h3>Leben</h3>
                                    <p>Wenn dein Leben ein Buch wäre, wie würde der Titel lauten?</p>
                                </div>

                                <div className="public-interest-card">
                                    <h3>Pläne</h3>
                                    <p>Worauf bist du gerade gehyped?</p>
                                </div>

                                <div className="public-interest-card">
                                    <h3>Persönlichkeit</h3>
                                    <p>Welche Version von dir zeigt sich nur nachts?</p>
                                </div>

                                <div className="public-interest-card">
                                    <h3>Musik</h3>
                                    <p>Welches Lied verbessert deine Laune?</p>
                                </div>

                            </div>

                            <div className="interest-overlay">

                                <h3>
                                    entdecke noch vieles mehr
                                </h3>

                                <p>
                                    erstelle dein eigenes profil um solche interessen beantworten zu können!
                                </p>

                                {/* FOOTER */}
                                <div className="public-footer">

                                    <button
                                        className="public-signup-button"
                                        onClick={() => navigate('/')}
                                    >
                                        eigenes profil erstellen
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            </div>

        </div>

    )
}

export default PublicProfile