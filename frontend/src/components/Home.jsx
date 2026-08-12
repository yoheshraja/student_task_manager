import React, { useMemo } from "react";
import Particles from "@tsparticles/react";
import styles from "../styles/Home.module.css";
import { Link } from "react-router-dom";

function Home() {
    const options = {
    fullScreen: {
        enable: false
    },

    particles: {
        number: {
            value: 55
        },

        color: {
            value: "#ffffff"
        },

        opacity: {
            value: 0.35
        },

        size: {
            value: {
                min: 1,
                max: 3
            }
        },

        links: {
            enable: true,
            distance: 140,
            color: "#ffffff",
            opacity: 0.18,
            width: 1
        },

        move: {
            enable: true,
            speed: 0.8
        }
    },

    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "grab"
            },

            onClick: {
                enable: true,
                mode: "push"
            }
        },

        modes: {
            grab: {
                distance: 160,
                links: {
                    opacity: 0.35
                }
            },

            push: {
                quantity: 3
            }
        }
    }
};

    return (
    <div className={styles.home}>

    <Particles
        id="home-particles"
        options={options}
    />

    <div className={styles.authLinks}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
    </div>

    <h1 className={styles.title}>
        Student Task Manager
    </h1>

</div>
    );
}

export default Home;