import { useState } from "react";
import "./App.css";

const initialState = {
  age: 22,
  gender: "Female",
  region: "Urban",
  income_level: "Medium",
  education_level: "Bachelor",
  daily_role: "Student",
  device_hours_per_day: 6.5,
  phone_unlocks: 85,
  notifications_per_day: 120,
  social_media_mins: 180,
  study_mins: 240,
  physical_activity_days: 3,
  sleep_hours: 6.5,
  sleep_quality: 3,
  anxiety_score: 7,
  depression_score: 5,
  stress_level: 6,
  happiness_score: 6,
  device_type: "Smartphone",
  productivity_score: 6,
  digital_dependence_score: 7,
  focus_score: 6
};

const steps = [
  {
    title: "👤 Personal Info",
    fields: ["age", "gender", "region", "income_level", "education_level", "daily_role"]
  },
  {
    title: "📱 Digital Usage",
    fields: ["device_type", "device_hours_per_day", "phone_unlocks", "notifications_per_day", "social_media_mins"]
  },
  {
    title: "⚡ Daily Activities",
    fields: ["study_mins", "physical_activity_days", "sleep_hours", "sleep_quality"]
  },
  {
    title: "🧠 Mental Wellbeing",
    fields: ["anxiety_score", "depression_score", "stress_level", "happiness_score", "productivity_score", "digital_dependence_score", "focus_score"]
  }
];

const fieldLabels = {
  age: "Age",
  gender: "Gender",
  region: "Region",
  income_level: "Income Level",
  education_level: "Education",
  daily_role: "Daily Role",
  device_hours_per_day: "Device Hours/Day",
  phone_unlocks: "Phone Unlocks/Day",
  notifications_per_day: "Notifications/Day",
  social_media_mins: "Social Media (min/day)",
  study_mins: "Study/Work Time (min/day)",
  physical_activity_days: "Active Days/Week",
  sleep_hours: "Sleep Hours/Night",
  sleep_quality: "Sleep Quality (1-5)",
  anxiety_score: "Anxiety Level (0-10)",
  depression_score: "Depression Level (0-10)",
  stress_level: "Stress Level (0-10)",
  happiness_score: "Happiness Level (0-10)",
  device_type: "Primary Device",
  productivity_score: "Productivity (0-10)",
  digital_dependence_score: "Digital Dependence (0-10)",
  focus_score: "Focus Ability (0-10)"
};

const fieldsConfig = {
  age: { type: "input", min: 10, max: 100 },
  gender: { type: "select", options: ["Female", "Male", "Other"] },
  region: { type: "select", options: ["Urban", "Rural"] },
  income_level: { type: "select", options: ["Low", "Medium", "High"] },
  education_level: { type: "select", options: ["Highschool", "Bachelor", "Master", "PhD"] },
  daily_role: { type: "select", options: ["Student", "Worker", "Other"] },
  device_hours_per_day: { type: "slider", min: 0, max: 24, step: 0.5, unit: "hrs" },
  phone_unlocks: { type: "slider", min: 0, max: 500, step: 5 },
  notifications_per_day: { type: "slider", min: 0, max: 500, step: 10 },
  social_media_mins: { type: "slider", min: 0, max: 600, step: 15, unit: "min" },
  study_mins: { type: "slider", min: 0, max: 600, step: 15, unit: "min" },
  physical_activity_days: { type: "slider", min: 0, max: 7, unit: "days" },
  sleep_hours: { type: "slider", min: 0, max: 12, step: 0.5, unit: "hrs" },
  sleep_quality: { type: "rating", min: 1, max: 5 },
  anxiety_score: { type: "rating", min: 0, max: 10 },
  depression_score: { type: "rating", min: 0, max: 10 },
  stress_level: { type: "rating", min: 0, max: 10 },
  happiness_score: { type: "rating", min: 0, max: 10 },
  device_type: { type: "select", options: ["Smartphone", "Tablet", "Other"] },
  productivity_score: { type: "rating", min: 0, max: 10 },
  digital_dependence_score: { type: "rating", min: 0, max: 10 },
  focus_score: { type: "rating", min: 0, max: 10 }
};

export default function App() {
  const [form, setForm] = useState(initialState);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const update = (key, value) => setForm({ ...form, [key]: value });

  const getRiskMessage = (predictedRisk) => {
    const risk = String(predictedRisk).trim();
    
    if (risk === "0" || risk === "0.0") {
      return {
        emoji: "✅",
        title: "Low Risk",
        message: "You are not at risk",
        color: "#10b981"
      };
    } else if (risk === "1" || risk === "1.0") {
      return {
        emoji: "⚠️",
        title: "High Risk",
        message: "You are at risk - consider seeking support",
        color: "#ef4444"
      };
    } else {
      return {
        emoji: "📊",
        title: "Risk Assessment",
        message: predictedRisk,
        color: "#667eea"
      };
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    else submit();
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const submit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("https://mental-health-risk-prediction-qd0t.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Request failed:", err);
      setResult({ error: "Unable to connect to the server. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(initialState);
    setCurrentStep(0);
    setResult(null);
  };

  if (result) {
    const riskInfo = result.error ? null : getRiskMessage(result.Results.WebServiceOutput0[0].PredictedRisk);
    
    return (
      <div className="container">
        <div className="result-card">
          <div className="result-header">
            <h1 className="result-title">
              {result.error ? "⚠️" : riskInfo.emoji} Assessment Complete
            </h1>
          </div>

          {result.error ? (
            <div className="error-box">
              <p>{result.error}</p>
            </div>
          ) : (
            <>
              <div className="risk-box" style={{ background: `linear-gradient(135deg, ${riskInfo.color}, ${riskInfo.color}dd)` }}>
                <div className="risk-label">{riskInfo.title}</div>
                <div className="risk-value">
                  {riskInfo.message}
                </div>
              </div>

              {result.Results.WebServiceOutput0[0].ConfidenceScores && (
                <div className="scores-section">
                  <h3 className="scores-title">Confidence Breakdown</h3>
                  {Object.entries(result.Results.WebServiceOutput0[0].ConfidenceScores).map(([k, v]) => (
                    <div key={k} className="score-item">
                      <div className="score-header">
                        <span className="score-label">{k}</span>
                        <span className="score-percent">{(v * 100).toFixed(1)}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${v * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          <button onClick={resetForm} className="reset-button">
            Start New Assessment
          </button>
        </div>
      </div>
    );
  }

  const currentFields = steps[currentStep].fields;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">🧠 Mental Health Risk Assessment</h1>
        <p className="subtitle">Answer a few questions to assess your mental wellbeing</p>
      </div>

      <div className="progress-container">
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-text">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>

      <div className="card">
        <h2 className="step-title">{steps[currentStep].title}</h2>

        <div className="fields-container">
          {currentFields.map((key) => {
            const config = fieldsConfig[key];
            const value = form[key];

            return (
              <div key={key} className="field">
                <label className="label">{fieldLabels[key]}</label>

                {config.type === "select" && (
                  <select
                    value={value}
                    onChange={(e) => update(key, e.target.value)}
                    className="select"
                  >
                    {config.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}

                {config.type === "slider" && (
                  <input
                    type="number"
                    min={config.min}
                    max={config.max}
                    step={config.step || 1}
                    value={value}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '') {
                        update(key, config.min);
                        return;
                      }
                      const num = parseFloat(val);
                      if (!isNaN(num)) {
                        update(key, num);
                      }
                    }}
                    onBlur={() => {
                      let num = value;
                      if (isNaN(num) || num < config.min) num = config.min;
                      if (num > config.max) num = config.max;
                      update(key, num);
                    }}
                    className="input"
                  />
                )}

                {config.type === "rating" && (
                  <div className="rating-container">
                    {Array.from({ length: config.max - config.min + 1 }, (_, i) => {
                      const ratingValue = config.min + i;
                      return (
                        <button
                          key={ratingValue}
                          onClick={() => update(key, ratingValue)}
                          className={`rating-button ${value === ratingValue ? 'active' : ''}`}
                        >
                          {ratingValue}
                        </button>
                      );
                    })}
                  </div>
                )}

                {config.type === "input" && (
                  <input
                    type="number"
                    min={config.min}
                    max={config.max}
                    step={config.step || 1}
                    value={value}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '') {
                        update(key, config.min);
                        return;
                      }
                      const num = parseFloat(val);
                      if (!isNaN(num)) {
                        update(key, num);
                      }
                    }}
                    onBlur={() => {
                      let num = value;
                      if (isNaN(num) || num < config.min) num = config.min;
                      if (num > config.max) num = config.max;
                      update(key, num);
                    }}
                    className="input"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="navigation">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="nav-button prev-button"
        >
          ← Previous
        </button>
        <button
          onClick={nextStep}
          disabled={loading}
          className="nav-button next-button"
        >
          {loading ? "Analyzing..." : currentStep === steps.length - 1 ? "Analyze ✨" : "Next →"}
        </button>
      </div>
    </div>
  );
}