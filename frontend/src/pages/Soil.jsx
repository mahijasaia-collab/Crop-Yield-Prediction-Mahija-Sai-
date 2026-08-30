import { useState } from "react";
import { analyzeSoil } from "../services/soilService";
import "../styles/Soil.css";

export default function Soil() {

    const [state, setState] = useState("");

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {

        if (!state.trim()) {
            alert("Please enter a state");
            return;
        }

        try {

            setLoading(true);

            const data = await analyzeSoil(state);

            console.log("Soil Analysis:", data);

            localStorage.setItem(
                "latestSoil",
                JSON.stringify(data)
            );

            setResult(data);

        } catch (err) {

            console.error(err);

            alert(err.message);

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="soil-container">

            <div className="soil-header">

                <h1>🌱 Soil Health Analysis</h1>

                <p>
                    Analyze soil nutrients and receive
                    AI-powered agricultural recommendations.
                </p>

            </div>


            {/* SEARCH */}

            <div className="soil-search">

                <input
                    type="text"
                    placeholder="Enter State (Example: Andhra Pradesh)"
                    value={state}
                    onChange={(e) =>
                        setState(e.target.value)
                    }
                />

                <button
                    onClick={handleAnalyze}
                    disabled={loading}
                >

                    {loading
                        ? "Analyzing..."
                        : "Analyze Soil"
                    }

                </button>

            </div>


            {result && (

                <>

                    {/* SCORE */}

                    <div className="soil-score-card">

                        <h2>
                            Overall Soil Health
                        </h2>

                        <h1>
                            {result.soil_score}/100
                        </h1>

                        <p>
                            {result.state}
                        </p>

                    </div>


                    {/* NUTRIENTS */}

                    <div className="soil-grid">

                        <div className="soil-card">

                            <h3>Nitrogen</h3>

                            <h2>
                                {result.nitrogen}
                            </h2>

                            <p>
                                {result.nitrogen_status}
                            </p>

                        </div>


                        <div className="soil-card">

                            <h3>Phosphorus</h3>

                            <h2>
                                {result.phosphorus}
                            </h2>

                            <p>
                                {result.phosphorus_status}
                            </p>

                        </div>


                        <div className="soil-card">

                            <h3>Potassium</h3>

                            <h2>
                                {result.potassium}
                            </h2>

                            <p>
                                {result.potassium_status}
                            </p>

                        </div>


                        <div className="soil-card">

                            <h3>pH</h3>

                            <h2>
                                {result.ph}
                            </h2>

                            <p>
                                {result.ph_status}
                            </p>

                        </div>

                    </div>


                    {/* RECOMMENDATIONS */}

                    <div className="soil-info">


                        {/* CROPS */}

                        <div className="recommend-card">

                            <h2>
                                🌾 Recommended Crops
                            </h2>

                            <div className="crop-list">

                                {result.crops.map(
                                    (crop, index) => (

                                        <span key={index}>
                                            {crop}
                                        </span>

                                    )
                                )}

                            </div>

                        </div>


                        {/* FERTILIZER */}

                        <div className="recommend-card">

                            <h2>
                                🧪 Fertilizer Recommendation
                            </h2>

                            <h3>
                                {result.fertilizer}
                            </h3>

                        </div>


                        {/* AI */}

                        <div className="recommend-card">

                            <h2>
                                🤖 AI Recommendation
                            </h2>

                            <p>
                                {result.recommendation}
                            </p>

                        </div>


                        {/* IMPROVEMENTS */}

                        <div className="recommend-card">

                            <h2>
                                💡 Soil Improvement Advice
                            </h2>

                            <ul className="soil-improvements">

                                {result.improvements.map(
                                    (item, index) => (

                                        <li key={index}>
                                            {item}
                                        </li>

                                    )
                                )}

                            </ul>

                        </div>

                    </div>

                </>

            )}

        </div>
    );
}