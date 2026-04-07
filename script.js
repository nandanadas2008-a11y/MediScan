// Disease Database
const diseases = {
    bacterial: [
        {
            name: "Tuberculosis",
            symptoms: ["persistent cough", "fever", "night sweats", "weight loss", "chest pain"],
            organism: "Mycobacterium tuberculosis",
            treatment: ["Isoniazid", "Rifampin", "Pyrazinamide", "Ethambutol", "6-9 months therapy"],
            mechanism: "💨 <strong>Inhaled bacilli</strong> → Alveolar macrophages phagocytose → <strong>Intracellular growth</strong> → Granuloma formation → Caseation necrosis → Systemic dissemination"
        },
        {
            name: "Typhoid Fever",
            symptoms: ["high fever", "headache", "abdominal pain", "diarrhea", "rose spots"],
            organism: "Salmonella typhi",
            treatment: ["Ciprofloxacin", "Ceftriaxone", "Azithromycin"],
            mechanism: "🍽️ <strong>Ingestion via contaminated food/water</strong> → Survives gastric acid → Invades intestinal M-cells → <strong>Bacteremia</strong> → Gallbladder colonization"
        },
        {
            name: "Cholera",
            symptoms: ["watery diarrhea", "vomiting", "dehydration", "muscle cramps"],
            organism: "Vibrio cholerae",
            treatment: ["Oral Rehydration Solution", "Doxycycline", "Azithromycin"],
            mechanism: "💧 <strong>Colonizes small intestine</strong> → A-B toxin → <strong>cAMP ↑</strong> → Cl⁻ secretion → Massive water loss"
        }
    ],
    viral: [
        {
            name: "Influenza",
            symptoms: ["fever", "cough", "sore throat", "muscle pain", "fatigue"],
            organism: "Influenza virus",
            treatment: ["Oseltamivir", "Zanamivir", "Supportive care"],
            mechanism: "🌬️ <strong>Airborne transmission</strong> → Respiratory epithelium → Viral replication → <strong>Cell lysis</strong> → Cytokine storm"
        },
        {
            name: "Hepatitis B",
            symptoms: ["fatigue", "jaundice", "dark urine", "abdominal pain"],
            organism: "Hepatitis B Virus (HBV)",
            treatment: ["Tenofovir", "Entecavir", "Interferon"],
            mechanism: "🩸 <strong>Hepatocyte infection</strong> → cccDNA formation → Chronic replication → <strong>Immune-mediated damage</strong>"
        },
        {
            name: "Dengue Fever",
            symptoms: ["high fever", "severe headache", "eye pain", "joint pain", "rash"],
            organism: "Dengue virus",
            treatment: ["Supportive care", "Paracetamol", "Fluids"],
            mechanism: "🦟 <strong>Monocyte infection</strong> → Cytokine storm → <strong>Plasma leakage</strong> → Hemorrhagic manifestations"
        }
    ],
    fungal: [
        {
            name: "Candidiasis",
            symptoms: ["white oral patches", "itching", "soreness", "burning"],
            organism: "Candida albicans",
            treatment: ["Fluconazole", "Nystatin", "Clotrimazole"],
            mechanism: "🔄 <strong>Hyphal transformation</strong> → Tissue invasion → <strong>Biofilm formation</strong> → Immune evasion"
        },
        {
            name: "Aspergillosis",
            symptoms: ["cough", "hemoptysis", "fever", "chest pain"],
            organism: "Aspergillus fumigatus",
            treatment: ["Voriconazole", "Amphotericin B"],
            mechanism: "🌬️ <strong>Hyphal growth</strong> → Angioinvasion → <strong>Tissue infarction</strong> → Necrotizing pneumonia"
        }
    ],
    protozoan: [
        {
            name: "Malaria",
            symptoms: ["fever", "chills", "sweating", "headache", "anemia"],
            organism: "Plasmodium falciparum",
            treatment: ["Artemether-Lumefantrine", "Quinine"],
            mechanism: "🦟 <strong>RBC invasion</strong> → Schizogony → Cytoadherence → <strong>Cerebral malaria</strong>"
        },
        {
            name: "Amoebiasis",
            symptoms: ["bloody diarrhea", "abdominal pain", "fever"],
            organism: "Entamoeba histolytica",
            treatment: ["Metronidazole", "Tinidazole"],
            mechanism: "💩 <strong>Mucosal invasion</strong> → Flask ulcers → <strong>Liver abscess</strong> formation"
        }
    ]
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('App initialized');
    populateDiseaseGrids();
    setupEventListeners();
});

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });

    // Symptom search Enter key
    const searchInput = document.getElementById('symptomSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchSymptoms();
            }
        });
    }

    // Modal close buttons
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    const modal = document.getElementById('mechanismModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Remove active from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Activate nav link
    const targetLink = document.querySelector(`[data-page="${pageId}"]`);
    if (targetLink) {
        targetLink.classList.add('active');
    }
    
    // Populate grids for category pages
    if (pageId !== 'home' && diseases[pageId]) {
        populateDiseaseGrids();
    }
}

function populateDiseaseGrids() {
    Object.keys(diseases).forEach(category => {
        const grid = document.getElementById(category + 'Grid');
        if (grid) {
            grid.innerHTML = '';
            diseases[category].forEach(disease => {
                const card = createDiseaseCard(disease);
                grid.appendChild(card);
            });
        }
    });
}

function createDiseaseCard(disease) {
    const card = document.createElement('div');
    card.className = 'disease-card';
    card.innerHTML = `
        <h3>${disease.name}</h3>
        <p><strong>Symptoms:</strong> ${disease.symptoms.slice(0, 3).join(', ')}${disease.symptoms.length > 3 ? '...' : ''}</p>
        <p><strong>Organism:</strong> 
            <span class="organism-link" style="cursor: pointer;" 
                  onclick="showMechanism('${disease.organism.replace(/'/g, "\\'")}', '${disease.mechanism.replace(/'/g, "\\'")}', '${disease.name}')">
                ${disease.organism}
            </span>
        </p>
        <div style="margin-top: 15px;">
            <strong>Treatment:</strong>
            <ul class="treatment-list">
                ${disease.treatment.map(t => `<li>💊 ${t}</li>`).join('')}
            </ul>
        </div>
    `;
    return card;
}

function searchSymptoms() {
    const query = document.getElementById('symptomSearch').value.toLowerCase().trim();
    const results = document.getElementById('searchResults');
    
    if (!query) {
        results.innerHTML = '<p style="color: #e74c3c; font-size: 1.2em; text-align: center;">❌ Please enter symptoms to search</p>';
        results.style.display = 'block';
        return;
    }

    let matches = [];
    Object.values(diseases).forEach(categoryDiseases => {
        categoryDiseases.forEach(disease => {
            if (disease.symptoms.some(symptom => 
                symptom.toLowerCase().includes(query))) {
                matches.push(disease);
            }
        });
    });

    if (matches.length === 0) {
        results.innerHTML = `
            <div style="text-align: center; padding: 30px;">
                <h3>🔍 No matches found</h3>
                <p>Try searching: "fever", "cough", "diarrhea", "rash"</p>
            </div>
        `;
    } else {
        results.innerHTML = `
            <h3 style="margin-bottom: 20px;">🔍 ${matches.length} disease(s) found:</h3>
            ${matches.map(disease => `
                <div class="disease-card">
                    <h4>${disease.name}</h4>
                    <p><strong>Symptoms match:</strong> ${disease.symptoms.slice(0, 2).join(', ')}</p>
                    <p><strong>Organism:</strong> 
                        <span class="organism-link" style="cursor: pointer;" 
                              onclick="showMechanism('${disease.organism.replace(/'/g, "\\'")}', '${disease.mechanism.replace(/'/g, "\\'")}', '${disease.name}')">
                            ${disease.organism}
                        </span>
                    </p>
                    <ul class="treatment-list">
                        ${disease.treatment.slice(0, 3).map(t => `<li>💊 ${t}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        `;
    }
    results.style.display = 'block';
}

function showMechanism(organism, mechanism, diseaseName) {
    const modal = document.getElementById('mechanismModal');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <h2 style="color: #2c3e50; margin-bottom: 10px;">${organism}</h2>
        <h3 style="color: #667eea; margin-bottom: 20px;">${diseaseName}</h3>
        
        <div style="background: #f8f9fa; padding: 25px; border-radius: 15px; margin: 25px 0; border-left: 5px solid #667eea;">
            <h4 style="color: #2c3e50; margin-bottom: 15px;">🔬 Pathogenesis Mechanism:</h4>
            <div style="font-size: 1.1em; line-height: 1.8;">${mechanism}</div>
        </div>
        
        <div class="mechanism-diagram">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 1.5em;">
                📊 Pathogenesis Pathway Animation
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('mechanismModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}