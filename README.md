# 🧠 Mental Health Risk Assessment

Sustav za procjenu rizika mentalnog zdravlja baziran na strojnom učenju koji analizira digitalne navike i osobne karakteristike korisnika.

## 🌐 Live Demo

**[Pokreni aplikaciju →](https://mental-health-risk-prediction-frontend.onrender.com/)**

> ⏱️ Prvi zahtjev može potrajati 2-3 minute dok se server "probudi" (Render free tier).

## 📋 O projektu

Aplikacija omogućava brzu procjenu potencijalnih rizika mentalnog zdravlja na temelju digitalnih navika, životnog stila i mentalnog stanja. Sustav koristi Azure ML Two-Class Boosted Decision Tree model za binarnu klasifikaciju (nizak/visok rizik).

> ⚠️ **Napomena:** Alat ne zamjenjuje profesionalnu medicinsku dijagnozu.

## ✨ Značajke

- 🎯 Binarna klasifikacija (nizak/visok rizik)
- 📊 Koeficijenti pouzdanosti za svaku predikciju
- 🧙 Wizard interface s 4 koraka
- 📱 Responzivni dizajn
- ⚡ Real-time predikcije preko REST API-ja

## 🏗️ Arhitektura

```
React Frontend → Backend API → Azure ML Model → Predikcija
```

**Tijek podataka:**
1. Korisnik unosi podatke kroz wizard (4 koraka)
2. Frontend validira i šalje JSON zahtjev
3. Backend prosljeđuje podatke Azure ML servisu
4. Model vraća predikciju i confidence scores
5. Frontend prikazuje rezultate s vizualnim oznakama

## 🤖 Model strojnog učenja

### Algoritam
**Two-Class Boosted Decision Tree** 

### Performanse
- Točnost: 86.3%
- Precision: 73.7%
- Recall: 42.4%
- AUC: ~0.70

### Ulazne značajke (23)
- **Demografski:** dob, spol, regija, prihodi, obrazovanje, uloga
- **Digitalne navike:** sati na uređajima, otključavanja, obavijesti, društvene mreže
- **Životni stil:** učenje/rad, fizička aktivnost, spavanje, kvaliteta sna
- **Mentalno stanje:** anksioznost, depresija, stres, sreća, produktivnost, digitalna ovisnost, fokus

### Predobrada
1. Odabir relevantnih kolona
2. Čišćenje nedostajućih vrijednosti (2 faze)
3. Definicija metapodataka
4. One-Hot Encoding kategorijskih varijabli
5. Normalizacija numeričkih značajki
6. Podjela na train/test

 ## 🛠️ Tehnologije

**Frontend:** React 18, Vanilla CSS, Fetch API  
**Backend:** Python, Flask/FastAPI, Azure ML SDK  
**ML:** Azure Machine Learning, Two-Class Boosted Decision Tree  
**Deployment:** Render (frontend + backend)

## 📊 Dataset

[Digital Health and Mental Wellness Dataset](https://www.kaggle.com/datasets/tarekmasryo/digital-health-and-mental-wellness/data) 
