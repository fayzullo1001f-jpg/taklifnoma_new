import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import "./App.css";

import musicFile from "./music/МОТ_Когда_мужчина_влюблён_Премьера_клипа,_2024.mp3";

import restaurant from "./img/L_height.webp";
import ring from "./img/pngtree-elegant-wedding-jewelry-set-featuring-wedding-rings-on-a-white-textured-image_13613257.png";
import bride from "./img/pexels-photo-35234597.webp";
import married from "./img/Conditions-for-getting-married-in-Quebec.jpg";
import groom from "./img/cake-cutting-tradition-wedding-planning-yacht-charter-nyc.jpg";

function App() {
    const [timeLeft, setTimeLeft] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const weddingDate = useMemo(
        () => new Date(2026, 4, 1, 18, 0, 0).getTime(),
        []
    );

    // ⏱ TIMER (sekund bilan)
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            if (distance < 0) {
                setTimeLeft("Boshlanmoqda 🎉");
                clearInterval(interval);
            } else {
                const d = Math.floor(distance / (1000 * 60 * 60 * 24));
                const h = Math.floor((distance / (1000 * 60 * 60)) % 24);
                const m = Math.floor((distance / (1000 * 60)) % 60);
                const s = Math.floor((distance / 1000) % 60);

                setTimeLeft(`${d} kun • ${h} soat • ${m} min • ${s} sek`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [weddingDate]);

    // 🎵 AUTO MUSIC (birinchi clickda)
    useEffect(() => {
        const playMusic = () => {
            const audio = audioRef.current;
            if (audio) {
                audio.play().catch(() => {});
                setIsPlaying(true);
            }
            window.removeEventListener("click", playMusic);
        };

        window.addEventListener("click", playMusic);

        return () => window.removeEventListener("click", playMusic);
    }, []);

    const fadeUp = {
        hidden: { opacity: 0, y: 80 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 }
        }
    };

    return (
        <div className="app">

            {/* AUDIO */}
            <audio ref={audioRef} loop>
                <source src={musicFile} type="audio/mp3" />
            </audio>

            {/* HERO */}
            <motion.section
                className="hero"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <motion.div
                    className="hero_text"
                    initial="hidden"
                    whileInView="show"
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.25 } }
                    }}
                >
                    <motion.h1 variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
                        SHAXZOD
                    </motion.h1>

                    <motion.span variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
                        &
                    </motion.span>

                    <motion.h1 variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
                        MARJONA
                    </motion.h1>
                </motion.div>

                <div className="hero_div"></div>
                <p className="date">01 MAY 2026</p>
            </motion.section>

            {/* INFO */}
            <motion.section className="section sed" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }}>
                <h2>TO‘Y TAKLIFNOMASI</h2>

                <p>
                    Hurmatli mehmonimiz <br />
                    Sizni 1 may soat 18:00 da Shaxzod va Marjonalarning nikoh to'ylari
                    munosabati bilan Toshkent shahar Versal to'yxonasiga taklif qilamiz
                </p>

                <img className="marry" src={married} alt="" />

                <div className="timer">{timeLeft}</div>
            </motion.section>

            {/* CALENDAR */}
            <motion.section className="section seds" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }}>
                <h2 className="wed">WEDDING DATE</h2>

                <img className="cake" src={groom} alt="" />

                <div className="calendar">
                    <div className="cal-header">MAY 2026</div>

                    <div className="cal-grid">
                        {["Du", "Se", "Cho", "Pa", "Ju", "Sha", "Yak"].map(d => (
                            <div key={d}>{d}</div>
                        ))}

                        {[...Array(4)].map((_, i) => <div key={i}></div>)}

                        {Array.from({ length: 31 }, (_, i) => (
                            <div key={i} className={i + 1 === 1 ? "active" : ""}>
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* LOCATION */}
            <motion.section className="section sect" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }}>
                <h2>Versal to‘yxonasi</h2>

                <img src={restaurant} alt="" className="restaurant" />

                <h2>LOKATSIYA</h2>

                <iframe
                    className="maps"
                    title="map"
                    src="https://www.google.com/maps?q=Versal%20to'yxonasi%20Toshkent&output=embed"
                />

                <button onClick={() =>
                    window.open("https://www.google.com/maps?q=Versal+to'yxonasi+Toshkent")
                }>
                    Open Map
                </button>
            </motion.section>

            {/* TIMELINE */}
            <motion.section className="section sed" variants={fadeUp} initial="hidden" whileInView="show">
                <h2 className="ser">TO‘Y DASTURI</h2>

                <div className="timeline">
                    {[
                        ["17:00", "Mehmonlar kutib olish"],
                        ["18:00", "Boshlanish vaqti"],
                        ["19:00", "Marosim davomi"],
                        ["22:00", "Tort kesish🎂"]
                    ].map(([time, event], i) => (
                        <motion.div
                            className="time-item"
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.25 }}
                        >
                            <div className="time">{time}</div>
                            <div>{event}</div>
                        </motion.div>
                    ))}
                </div>

                <img className="ring" src={ring} alt="" />
            </motion.section>

            {/* FOOTER */}
            <motion.section className="footer" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}>
                <h1>
                    Shaxzod <br /> & <br /> Marjona
                </h1>

                <img src={bride} className="bride" alt="" />

                <p>Sizni kutamiz ❤️</p>
            </motion.section>

        </div>
    );
}

export default App;