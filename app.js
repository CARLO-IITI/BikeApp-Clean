/**
 * BikeScore - Complete Motorcycle Comparison Tool
 * Implements WSM, TOPSIS, VFM, and AHP scoring methods
 * Supports comprehensive motorcycle specifications
 */

// ===== Criteria Configuration =====
const CRITERIA = {
    // Price & Cost
    price: { 
        name: 'Price', 
        icon: '💰', 
        category: 'price',
        lowerIsBetter: true, 
        unit: '$',
        defaultWeight: 12
    },
    serviceCost: { 
        name: 'Service Cost', 
        icon: '🔧', 
        category: 'price',
        lowerIsBetter: true, 
        unit: '$/yr',
        defaultWeight: 8
    },
    
    // Performance
    engine: { 
        name: 'Engine', 
        icon: '🔥', 
        category: 'performance',
        lowerIsBetter: false, 
        unit: 'cc',
        defaultWeight: 8
    },
    horsepower: { 
        name: 'Horsepower', 
        icon: '🐎', 
        category: 'performance',
        lowerIsBetter: false, 
        unit: 'HP',
        defaultWeight: 10
    },
    torque: { 
        name: 'Torque', 
        icon: '💪', 
        category: 'performance',
        lowerIsBetter: false, 
        unit: 'Nm',
        defaultWeight: 8
    },
    topSpeed: { 
        name: 'Top Speed', 
        icon: '🚀', 
        category: 'performance',
        lowerIsBetter: false, 
        unit: 'km/h',
        defaultWeight: 5
    },
    acceleration: { 
        name: '0-100 km/h', 
        icon: '⏱️', 
        category: 'performance',
        lowerIsBetter: true, 
        unit: 's',
        defaultWeight: 6
    },
    mileage: { 
        name: 'Mileage', 
        icon: '⛽', 
        category: 'performance',
        lowerIsBetter: false, 
        unit: 'km/l',
        defaultWeight: 8
    },
    weight: { 
        name: 'Weight', 
        icon: '⚖️', 
        category: 'performance',
        lowerIsBetter: true, 
        unit: 'kg',
        defaultWeight: 5
    },
    fuelCapacity: { 
        name: 'Fuel Tank', 
        icon: '🛢️', 
        category: 'performance',
        lowerIsBetter: false, 
        unit: 'L',
        defaultWeight: 3
    },
    
    // Comfort
    seatHeight: { 
        name: 'Seat Height', 
        icon: '📏', 
        category: 'comfort',
        lowerIsBetter: null, // Preference varies
        unit: 'mm',
        defaultWeight: 2
    },
    comfort: { 
        name: 'Seat Comfort', 
        icon: '🛋️', 
        category: 'comfort',
        lowerIsBetter: false, 
        unit: '/10',
        defaultWeight: 5
    },
    ergonomics: { 
        name: 'Riding Position', 
        icon: '🧘', 
        category: 'comfort',
        lowerIsBetter: false, 
        unit: '/10',
        defaultWeight: 4
    },
    windProtection: { 
        name: 'Wind Protection', 
        icon: '🌬️', 
        category: 'comfort',
        lowerIsBetter: false, 
        unit: '/10',
        defaultWeight: 3
    },
    
    // Safety (Braking & Suspension)
    frontBrake: { 
        name: 'Front Brake', 
        icon: '🛑', 
        category: 'safety',
        lowerIsBetter: false, 
        unit: '/10',
        defaultWeight: 4
    },
    rearBrake: { 
        name: 'Rear Brake', 
        icon: '🔴', 
        category: 'safety',
        lowerIsBetter: false, 
        unit: '/10',
        defaultWeight: 3
    },
    abs: { 
        name: 'ABS Quality', 
        icon: '🅰️', 
        category: 'safety',
        lowerIsBetter: false, 
        unit: '/10',
        defaultWeight: 5
    },
    frontSuspension: { 
        name: 'Front Suspension', 
        icon: '🔧', 
        category: 'safety',
        lowerIsBetter: false, 
        unit: '/10',
        defaultWeight: 4
    },
    rearSuspension: { 
        name: 'Rear Suspension', 
        icon: '⚙️', 
        category: 'safety',
        lowerIsBetter: false, 
        unit: '/10',
        defaultWeight: 4
    },
    
    // Features
    instrumentation: { 
        name: 'Instrumentation', 
        icon: '📊', 
        category: 'features',
        lowerIsBetter: false, 
        unit: '/10',
        defaultWeight: 3
    },
    lighting: { 
        name: 'Lighting', 
        icon: '💡', 
        category: 'features',
        lowerIsBetter: false, 
        unit: '/10',
        defaultWeight: 2
    },
    electronics: { 
        name: 'Electronics/Modes', 
        icon: '🎛️', 
        category: 'features',
        lowerIsBetter: false, 
        unit: '/10',
        defaultWeight: 4
    },
    buildQuality: { 
        name: 'Build Quality', 
        icon: '🏗️', 
        category: 'features',
        lowerIsBetter: false, 
        unit: '/10',
        defaultWeight: 5
    },
    reliability: { 
        name: 'Reliability', 
        icon: '✅', 
        category: 'features',
        lowerIsBetter: false, 
        unit: '/10',
        defaultWeight: 6
    }
};

const CRITERIA_KEYS = Object.keys(CRITERIA);

const CATEGORIES = {
    price: { name: 'Price', icon: '💰' },
    performance: { name: 'Performance', icon: '⚡' },
    comfort: { name: 'Comfort', icon: '🛋️' },
    safety: { name: 'Safety', icon: '🛡️' },
    features: { name: 'Features', icon: '✨' }
};

// Method descriptions - Simplified for users
const METHOD_INFO = {
    wsm: {
        emoji: '⭐',
        title: 'Best Overall',
        badge: 'recommended',
        badgeText: 'Recommended',
        simple: 'Add up all the good things about each bike, weighted by what matters to you.',
        example: 'If you care 50% about power and 50% about mileage, a bike with great power but poor mileage scores the same as one with great mileage but poor power.',
        bestFor: 'First-time buyers, general comparisons, when you know what you want'
    },
    vfm: {
        emoji: '💰',
        title: 'Best Value for Money',
        badge: 'budget',
        badgeText: 'Budget-Friendly',
        simple: 'Find which bike gives you the most features and quality for every rupee spent.',
        example: 'A ₹1 Lakh bike with score 80 beats a ₹2 Lakh bike with score 100. Because 80÷1 = 80, but 100÷2 = 50. You get more per rupee!',
        bestFor: 'Budget buyers, students, value seekers, first bike purchase'
    },
    topsis: {
        emoji: '🎯',
        title: 'Closest to Perfect',
        badge: 'precision',
        badgeText: 'Precision',
        simple: 'Find the bike that\'s nearest to your "dream bike" and farthest from your "nightmare bike".',
        example: 'Imagine your perfect bike has max power, best mileage, lowest price. This method finds which real bike comes closest to that imaginary perfect bike.',
        bestFor: 'Experienced riders, specific requirements, comparing similar bikes'
    },
    ahp: {
        emoji: '🤔',
        title: 'Help Me Decide',
        badge: 'guided',
        badgeText: 'Guided',
        simple: 'Not sure what\'s important? Answer simple questions like "Is power more important than mileage?" and we\'ll figure out your priorities.',
        example: 'We\'ll ask: "Power vs Comfort - which matters more?" Your answers help us understand what you really want.',
        bestFor: 'Confused buyers, when you can\'t set percentages, want guidance'
    }
};

// ===== State Management =====
const state = {
    bikes: [],
    weights: {},
    method: 'wsm',
    ahpMatrix: null,
    activeCategory: 'all'
};

// Initialize default weights
CRITERIA_KEYS.forEach(key => {
    state.weights[key] = CRITERIA[key].defaultWeight;
});

// ===== DOM Elements =====
const elements = {
    bikesList: document.getElementById('bikesList'),
    emptyState: document.getElementById('emptyState'),
    resultsContainer: document.getElementById('resultsContainer'),
    resultsEmpty: document.getElementById('resultsEmpty'),
    methodInfo: document.getElementById('methodInfo'),
    totalWeight: document.getElementById('totalWeight'),
    weightsList: document.getElementById('weightsList'),
    exportBtn: document.getElementById('exportBtn'),
    // Modal elements
    bikeModal: document.getElementById('bikeModal'),
    bikeForm: document.getElementById('bikeForm'),
    modalTitle: document.getElementById('modalTitle'),
    bikeId: document.getElementById('bikeId'),
    // AHP Modal
    ahpModal: document.getElementById('ahpModal'),
    ahpComparisons: document.getElementById('ahpComparisons'),
    // AI Import Modal
    aiModal: document.getElementById('aiModal'),
    aiInput: document.getElementById('aiInput'),
    aiPreview: document.getElementById('aiPreview'),
    aiPreviewGrid: document.getElementById('aiPreviewGrid')
};

// Store extracted data
let extractedBikeData = null;

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    loadFromStorage();
    renderWeightsList();
    updateUI();
});

function initEventListeners() {
    // Add bike button
    document.getElementById('addBikeBtn').addEventListener('click', () => openBikeModal());
    
    // AI Import button
    document.getElementById('aiImportBtn').addEventListener('click', openAiModal);
    document.getElementById('closeAiModal').addEventListener('click', closeAiModal);
    document.getElementById('cancelAiBtn').addEventListener('click', closeAiModal);
    document.getElementById('extractBtn').addEventListener('click', extractSpecs);
    document.getElementById('addExtractedBtn').addEventListener('click', addExtractedBike);
    
    // Modal controls
    document.getElementById('closeModal').addEventListener('click', closeBikeModal);
    document.getElementById('cancelBtn').addEventListener('click', closeBikeModal);
    elements.bikeForm.addEventListener('submit', handleBikeSubmit);
    
    // AHP Modal controls
    document.getElementById('closeAhpModal').addEventListener('click', closeAhpModal);
    document.getElementById('cancelAhpBtn').addEventListener('click', closeAhpModal);
    document.getElementById('applyAhpBtn').addEventListener('click', applyAhpWeights);
    
    // Method selection
    document.querySelectorAll('.method-card').forEach(card => {
        card.addEventListener('click', () => selectMethod(card.dataset.method));
    });
    
    // Category tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => selectCategory(tab.dataset.category));
    });
    
    // Reset and equalize weights
    document.getElementById('resetWeights').addEventListener('click', resetWeights);
    document.getElementById('equalizeWeights').addEventListener('click', equalizeWeights);
    
    // Compare button
    document.getElementById('compareBtn').addEventListener('click', calculateScores);
    
    // Export button
    elements.exportBtn.addEventListener('click', exportResults);
    
    // Close modal on overlay click
    elements.bikeModal.addEventListener('click', (e) => {
        if (e.target === elements.bikeModal) closeBikeModal();
    });
    elements.ahpModal.addEventListener('click', (e) => {
        if (e.target === elements.ahpModal) closeAhpModal();
    });
    elements.aiModal.addEventListener('click', (e) => {
        if (e.target === elements.aiModal) closeAiModal();
    });
}

// ===== Storage =====
function saveToStorage() {
    localStorage.setItem('bikeScore_bikes', JSON.stringify(state.bikes));
    localStorage.setItem('bikeScore_weights', JSON.stringify(state.weights));
    localStorage.setItem('bikeScore_method', state.method);
}

function loadFromStorage() {
    const bikes = localStorage.getItem('bikeScore_bikes');
    const weights = localStorage.getItem('bikeScore_weights');
    const method = localStorage.getItem('bikeScore_method');
    
    if (bikes) state.bikes = JSON.parse(bikes);
    if (weights) {
        const savedWeights = JSON.parse(weights);
        // Merge with defaults for any new criteria
        CRITERIA_KEYS.forEach(key => {
            if (savedWeights[key] !== undefined) {
                state.weights[key] = savedWeights[key];
            }
        });
    }
    if (method) state.method = method;
    
    // Update method selection
    selectMethod(state.method, false);
}

// ===== Render Weights List =====
function renderWeightsList() {
    const categoryGroups = {};
    
    // Group criteria by category
    CRITERIA_KEYS.forEach(key => {
        const cat = CRITERIA[key].category;
        if (!categoryGroups[cat]) categoryGroups[cat] = [];
        categoryGroups[cat].push(key);
    });
    
    elements.weightsList.innerHTML = Object.entries(categoryGroups).map(([category, keys]) => `
        <div class="weight-category" data-category="${category}">
            <div class="weight-category-title">
                <span>${CATEGORIES[category].icon} ${CATEGORIES[category].name}</span>
                <button class="weight-category-toggle" onclick="toggleCategory('${category}')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                        <polyline points="6,9 12,15 18,9"/>
                    </svg>
                </button>
            </div>
            <div class="weight-category-items">
                ${keys.map(key => `
                    <div class="weight-item" data-criterion="${key}" data-category="${category}">
                        <div class="weight-label">
                            <span class="weight-icon">${CRITERIA[key].icon}</span>
                            <span>${CRITERIA[key].name}</span>
                            <span class="weight-value" id="${key}WeightValue">${state.weights[key]}%</span>
                        </div>
                        <input type="range" min="0" max="30" value="${state.weights[key]}" 
                               class="weight-slider" id="${key}Weight" data-criterion="${key}">
                        <span class="weight-note">${CRITERIA[key].lowerIsBetter === true ? 'Lower is better' : 
                                                   CRITERIA[key].lowerIsBetter === false ? 'Higher is better' : 
                                                   'Preference varies'}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    // Add event listeners to sliders
    document.querySelectorAll('.weight-slider').forEach(slider => {
        slider.addEventListener('input', handleWeightChange);
    });
    
    updateTotalWeight();
    filterWeightsByCategory();
}

window.toggleCategory = function(category) {
    const catEl = document.querySelector(`.weight-category[data-category="${category}"]`);
    catEl.classList.toggle('collapsed');
};

function selectCategory(category) {
    state.activeCategory = category;
    
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === category);
    });
    
    filterWeightsByCategory();
}

function filterWeightsByCategory() {
    document.querySelectorAll('.weight-category').forEach(cat => {
        if (state.activeCategory === 'all' || cat.dataset.category === state.activeCategory) {
            cat.style.display = '';
        } else {
            cat.style.display = 'none';
        }
    });
}

// ===== UI Updates =====
function updateUI() {
    renderBikesList();
    updateTotalWeight();
    updateMethodInfo();
}

function renderBikesList() {
    if (state.bikes.length === 0) {
        elements.emptyState.style.display = 'flex';
        return;
    }
    
    elements.emptyState.style.display = 'none';
    
    // Clear existing bike cards (keep empty state)
    const existingCards = elements.bikesList.querySelectorAll('.bike-card');
    existingCards.forEach(card => card.remove());
    
    state.bikes.forEach(bike => {
        const card = createBikeCard(bike);
        elements.bikesList.appendChild(card);
    });
}

function createBikeCard(bike) {
    const card = document.createElement('div');
    card.className = 'bike-card';
    card.dataset.id = bike.id;
    
    // Show key specs
    const keySpecs = [
        { label: 'Price', value: `$${(bike.price || 0).toLocaleString()}` },
        { label: 'HP', value: bike.horsepower || '-' },
        { label: 'Torque', value: bike.torque ? `${bike.torque}Nm` : '-' },
        { label: 'Mileage', value: bike.mileage ? `${bike.mileage}km/l` : '-' },
        { label: 'Weight', value: bike.weight ? `${bike.weight}kg` : '-' },
        { label: 'Engine', value: bike.engine ? `${bike.engine}cc` : '-' }
    ];
    
    card.innerHTML = `
        <div class="bike-card-header">
            <span class="bike-name">${escapeHtml(bike.name)}</span>
            <div class="bike-actions">
                <button class="edit" title="Edit" onclick="editBike('${bike.id}')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                </button>
                <button class="delete" title="Delete" onclick="deleteBike('${bike.id}')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                    </svg>
                </button>
            </div>
        </div>
        <div class="bike-specs-grid">
            ${keySpecs.map(spec => `
                <div class="bike-spec-compact">
                    <span class="bike-spec-label">${spec.label}</span>
                    <span class="bike-spec-value">${spec.value}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    return card;
}

function updateTotalWeight() {
    const total = Object.values(state.weights).reduce((sum, w) => sum + w, 0);
    elements.totalWeight.textContent = total;
    elements.totalWeight.style.color = (total >= 95 && total <= 105) ? '' : '#ff4757';
}

function updateMethodInfo() {
    const info = METHOD_INFO[state.method];
    elements.methodInfo.innerHTML = `
        <div class="info-card">
            <div class="info-card-header">
                <span class="info-badge ${info.badge}">${info.badgeText}</span>
                <h4>${info.emoji} ${info.title}</h4>
            </div>
            <p class="info-simple"><strong>In simple words:</strong> ${info.simple}</p>
            <div class="info-example">
                <span class="example-label">Example:</span>
                ${info.example}
            </div>
            <div class="info-best-for">
                <span>✓ Best for:</span> ${info.bestFor}
            </div>
        </div>
    `;
}

// ===== Modal Handling =====
function openBikeModal(bikeId = null) {
    if (bikeId) {
        const bike = state.bikes.find(b => b.id === bikeId);
        if (bike) {
            elements.modalTitle.textContent = 'Edit Motorcycle';
            elements.bikeId.value = bike.id;
            
            // Map bike properties to form fields
            const fieldMappings = {
                'bikeName': 'name',
                'bikePrice': 'price',
                'bikeServiceCost': 'serviceCost',
                'bikeEngine': 'engine',
                'bikeHorsepower': 'horsepower',
                'bikeTorque': 'torque',
                'bikeTopSpeed': 'topSpeed',
                'bikeAcceleration': 'acceleration',
                'bikeMileage': 'mileage',
                'bikeWeight': 'weight',
                'bikeSeatHeight': 'seatHeight',
                'bikeFuelCapacity': 'fuelCapacity',
                'bikeFrontBrake': 'frontBrake',
                'bikeRearBrake': 'rearBrake',
                'bikeABS': 'abs',
                'bikeFrontSuspension': 'frontSuspension',
                'bikeRearSuspension': 'rearSuspension',
                'bikeComfort': 'comfort',
                'bikeErgonomics': 'ergonomics',
                'bikeWindProtection': 'windProtection',
                'bikeInstrumentation': 'instrumentation',
                'bikeLighting': 'lighting',
                'bikeElectronics': 'electronics',
                'bikeBuildQuality': 'buildQuality',
                'bikeReliability': 'reliability'
            };
            
            Object.entries(fieldMappings).forEach(([fieldId, prop]) => {
                const field = document.getElementById(fieldId);
                if (field && bike[prop] !== undefined) {
                    field.value = bike[prop];
                }
            });
        }
    } else {
        elements.modalTitle.textContent = 'Add New Motorcycle';
        elements.bikeForm.reset();
        elements.bikeId.value = '';
    }
    
    elements.bikeModal.classList.add('active');
}

function closeBikeModal() {
    elements.bikeModal.classList.remove('active');
    elements.bikeForm.reset();
    elements.bikeId.value = '';
}

function handleBikeSubmit(e) {
    e.preventDefault();
    
    const getVal = (id, parser = parseFloat) => {
        const el = document.getElementById(id);
        const val = el ? el.value : null;
        if (val === '' || val === null) return null;
        return parser(val);
    };
    
    const bikeData = {
        id: elements.bikeId.value || generateId(),
        name: document.getElementById('bikeName').value.trim(),
        price: getVal('bikePrice'),
        serviceCost: getVal('bikeServiceCost'),
        engine: getVal('bikeEngine'),
        horsepower: getVal('bikeHorsepower'),
        torque: getVal('bikeTorque'),
        topSpeed: getVal('bikeTopSpeed'),
        acceleration: getVal('bikeAcceleration'),
        mileage: getVal('bikeMileage'),
        weight: getVal('bikeWeight'),
        seatHeight: getVal('bikeSeatHeight'),
        fuelCapacity: getVal('bikeFuelCapacity'),
        frontBrake: getVal('bikeFrontBrake'),
        rearBrake: getVal('bikeRearBrake'),
        abs: getVal('bikeABS'),
        frontSuspension: getVal('bikeFrontSuspension'),
        rearSuspension: getVal('bikeRearSuspension'),
        comfort: getVal('bikeComfort'),
        ergonomics: getVal('bikeErgonomics'),
        windProtection: getVal('bikeWindProtection'),
        instrumentation: getVal('bikeInstrumentation'),
        lighting: getVal('bikeLighting'),
        electronics: getVal('bikeElectronics'),
        buildQuality: getVal('bikeBuildQuality'),
        reliability: getVal('bikeReliability')
    };
    
    if (elements.bikeId.value) {
        const index = state.bikes.findIndex(b => b.id === bikeData.id);
        if (index !== -1) {
            state.bikes[index] = bikeData;
        }
    } else {
        state.bikes.push(bikeData);
    }
    
    saveToStorage();
    closeBikeModal();
    updateUI();
}

// Global functions for onclick handlers
window.editBike = function(id) {
    openBikeModal(id);
};

window.deleteBike = function(id) {
    if (confirm('Are you sure you want to delete this motorcycle?')) {
        state.bikes = state.bikes.filter(b => b.id !== id);
        saveToStorage();
        updateUI();
        
        elements.resultsContainer.innerHTML = '';
        elements.resultsContainer.appendChild(elements.resultsEmpty);
        elements.resultsEmpty.style.display = 'flex';
        elements.exportBtn.style.display = 'none';
    }
};

// ===== Method Selection =====
function selectMethod(method, save = true) {
    state.method = method;
    
    document.querySelectorAll('.method-card').forEach(card => {
        card.classList.toggle('active', card.dataset.method === method);
    });
    
    updateMethodInfo();
    
    if (save) saveToStorage();
}

// ===== Weight Handling =====
function handleWeightChange(e) {
    const criterion = e.target.dataset.criterion;
    const value = parseInt(e.target.value);
    
    state.weights[criterion] = value;
    document.getElementById(`${criterion}WeightValue`).textContent = `${value}%`;
    
    updateTotalWeight();
    saveToStorage();
}

function resetWeights() {
    CRITERIA_KEYS.forEach(key => {
        state.weights[key] = CRITERIA[key].defaultWeight;
        const slider = document.getElementById(`${key}Weight`);
        if (slider) {
            slider.value = CRITERIA[key].defaultWeight;
            document.getElementById(`${key}WeightValue`).textContent = `${CRITERIA[key].defaultWeight}%`;
        }
    });
    
    updateTotalWeight();
    saveToStorage();
}

function equalizeWeights() {
    const perCriterion = Math.floor(100 / CRITERIA_KEYS.length);
    
    CRITERIA_KEYS.forEach(key => {
        state.weights[key] = perCriterion;
        const slider = document.getElementById(`${key}Weight`);
        if (slider) {
            slider.value = perCriterion;
            document.getElementById(`${key}WeightValue`).textContent = `${perCriterion}%`;
        }
    });
    
    updateTotalWeight();
    saveToStorage();
}

// ===== AHP Modal =====
function openAhpModal() {
    generateAhpComparisons();
    elements.ahpModal.classList.add('active');
}

function closeAhpModal() {
    elements.ahpModal.classList.remove('active');
}

function generateAhpComparisons() {
    // For AHP, compare categories instead of all criteria (too many pairs otherwise)
    const categoryKeys = Object.keys(CATEGORIES);
    const pairs = [];
    
    for (let i = 0; i < categoryKeys.length; i++) {
        for (let j = i + 1; j < categoryKeys.length; j++) {
            pairs.push([categoryKeys[i], categoryKeys[j]]);
        }
    }
    
    state.ahpMatrix = {};
    pairs.forEach(([a, b]) => {
        state.ahpMatrix[`${a}_${b}`] = 1;
    });
    
    const scaleLabels = {
        '1/9': '9×', '1/7': '7×', '1/5': '5×', '1/3': '3×',
        '1': '=',
        '3': '3×', '5': '5×', '7': '7×', '9': '9×'
    };
    
    elements.ahpComparisons.innerHTML = pairs.map(([a, b]) => `
        <div class="ahp-pair" data-pair="${a}_${b}">
            <div class="ahp-pair-header">
                <span class="ahp-criterion">${CATEGORIES[a].icon} ${CATEGORIES[a].name}</span>
                <span class="ahp-vs">vs</span>
                <span class="ahp-criterion">${CATEGORIES[b].icon} ${CATEGORIES[b].name}</span>
            </div>
            <div class="ahp-scale">
                ${Object.entries(scaleLabels).map(([value, label]) => `
                    <button data-value="${value}" class="${value === '1' ? 'active' : ''}" 
                            title="${value.includes('/') ? CATEGORIES[a].name + ' ' + label + ' more important' : 
                                   value === '1' ? 'Equal importance' : 
                                   CATEGORIES[b].name + ' ' + label + ' more important'}">
                        ${label}
                    </button>
                `).join('')}
            </div>
            <div class="ahp-labels" style="display:flex; justify-content:space-between; font-size:0.7rem; color:var(--text-muted); margin-top:4px;">
                <span>← ${CATEGORIES[a].name} more important</span>
                <span>${CATEGORIES[b].name} more important →</span>
            </div>
        </div>
    `).join('');
    
    elements.ahpComparisons.querySelectorAll('.ahp-scale button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const pair = e.target.closest('.ahp-pair');
            const pairKey = pair.dataset.pair;
            
            pair.querySelectorAll('.ahp-scale button').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            state.ahpMatrix[pairKey] = evalFraction(e.target.dataset.value);
        });
    });
}

function evalFraction(str) {
    if (str.includes('/')) {
        const [num, denom] = str.split('/').map(Number);
        return num / denom;
    }
    return parseFloat(str);
}

function applyAhpWeights() {
    const categoryKeys = Object.keys(CATEGORIES);
    const n = categoryKeys.length;
    const matrix = Array(n).fill(null).map(() => Array(n).fill(1));
    
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const key = `${categoryKeys[i]}_${categoryKeys[j]}`;
            const value = state.ahpMatrix[key] || 1;
            matrix[i][j] = value;
            matrix[j][i] = 1 / value;
        }
    }
    
    // Calculate priority vector using geometric mean
    const geometricMeans = matrix.map(row => {
        const product = row.reduce((acc, val) => acc * val, 1);
        return Math.pow(product, 1 / n);
    });
    
    const sum = geometricMeans.reduce((acc, val) => acc + val, 0);
    const categoryPriorities = {};
    categoryKeys.forEach((key, i) => {
        categoryPriorities[key] = geometricMeans[i] / sum;
    });
    
    // Distribute category weights to criteria within each category
    const categoryCriteriaCounts = {};
    CRITERIA_KEYS.forEach(key => {
        const cat = CRITERIA[key].category;
        categoryCriteriaCounts[cat] = (categoryCriteriaCounts[cat] || 0) + 1;
    });
    
    CRITERIA_KEYS.forEach(key => {
        const cat = CRITERIA[key].category;
        const catWeight = categoryPriorities[cat] * 100;
        const criteriaInCat = categoryCriteriaCounts[cat];
        state.weights[key] = Math.round(catWeight / criteriaInCat);
    });
    
    // Update UI
    CRITERIA_KEYS.forEach(key => {
        const slider = document.getElementById(`${key}Weight`);
        if (slider) {
            slider.value = state.weights[key];
            document.getElementById(`${key}WeightValue`).textContent = `${state.weights[key]}%`;
        }
    });
    
    updateTotalWeight();
    saveToStorage();
    closeAhpModal();
    
    showNotification('AHP weights applied successfully!');
}

// ===== Scoring Algorithms =====
function calculateScores() {
    if (state.bikes.length < 2) {
        showNotification('Please add at least 2 motorcycles to compare', 'warning');
        return;
    }
    
    if (state.method === 'ahp' && !state.ahpMatrix) {
        openAhpModal();
        return;
    }
    
    // Filter criteria that have data for at least 2 bikes
    const activeCriteria = CRITERIA_KEYS.filter(key => {
        const values = state.bikes.map(b => b[key]).filter(v => v !== null && v !== undefined);
        return values.length >= 2 && state.weights[key] > 0;
    });
    
    if (activeCriteria.length === 0) {
        showNotification('Not enough data. Please fill in more specifications.', 'warning');
        return;
    }
    
    let results;
    
    switch (state.method) {
        case 'wsm':
            results = calculateWSM(activeCriteria);
            break;
        case 'topsis':
            results = calculateTOPSIS(activeCriteria);
            break;
        case 'vfm':
            results = calculateVFM(activeCriteria);
            break;
        case 'ahp':
            results = calculateWSM(activeCriteria);
            break;
        default:
            results = calculateWSM(activeCriteria);
    }
    
    renderResults(results, activeCriteria);
}

function normalize(values, lowerIsBetter = false) {
    const validValues = values.filter(v => v !== null && v !== undefined);
    if (validValues.length === 0) return values.map(() => 0.5);
    
    const min = Math.min(...validValues);
    const max = Math.max(...validValues);
    
    if (max === min) return values.map(v => v !== null ? 1 : 0.5);
    
    return values.map(v => {
        if (v === null || v === undefined) return 0.5; // Neutral for missing data
        const normalized = (v - min) / (max - min);
        return lowerIsBetter ? (1 - normalized) : normalized;
    });
}

function calculateWSM(activeCriteria) {
    const totalWeight = activeCriteria.reduce((sum, key) => sum + state.weights[key], 0);
    const normalizedWeights = {};
    activeCriteria.forEach(key => {
        normalizedWeights[key] = state.weights[key] / totalWeight;
    });
    
    const normalized = {};
    activeCriteria.forEach(key => {
        const values = state.bikes.map(b => b[key]);
        const lowerIsBetter = CRITERIA[key].lowerIsBetter;
        normalized[key] = normalize(values, lowerIsBetter === true);
    });
    
    return state.bikes.map((bike, i) => {
        const breakdown = {};
        let totalScore = 0;
        
        activeCriteria.forEach(key => {
            const contribution = normalized[key][i] * normalizedWeights[key];
            breakdown[key] = {
                raw: bike[key],
                normalized: normalized[key][i],
                weighted: contribution
            };
            totalScore += contribution;
        });
        
        return { bike, score: totalScore * 100, breakdown };
    }).sort((a, b) => b.score - a.score);
}

function calculateTOPSIS(activeCriteria) {
    const totalWeight = activeCriteria.reduce((sum, key) => sum + state.weights[key], 0);
    const normalizedWeights = {};
    activeCriteria.forEach(key => {
        normalizedWeights[key] = state.weights[key] / totalWeight;
    });
    
    // Vector normalization
    const normalized = {};
    activeCriteria.forEach(key => {
        const values = state.bikes.map(b => b[key] || 0);
        const sqrtSumSquares = Math.sqrt(values.reduce((sum, v) => sum + v * v, 0));
        normalized[key] = values.map(v => sqrtSumSquares > 0 ? v / sqrtSumSquares : 0);
    });
    
    // Apply weights
    const weighted = {};
    activeCriteria.forEach(key => {
        weighted[key] = normalized[key].map(v => v * normalizedWeights[key]);
    });
    
    // Find ideal best and worst
    const idealBest = {};
    const idealWorst = {};
    activeCriteria.forEach(key => {
        const lowerIsBetter = CRITERIA[key].lowerIsBetter === true;
        if (lowerIsBetter) {
            idealBest[key] = Math.min(...weighted[key]);
            idealWorst[key] = Math.max(...weighted[key]);
        } else {
            idealBest[key] = Math.max(...weighted[key]);
            idealWorst[key] = Math.min(...weighted[key]);
        }
    });
    
    return state.bikes.map((bike, i) => {
        let distanceBest = 0;
        let distanceWorst = 0;
        const breakdown = {};
        
        activeCriteria.forEach(key => {
            const wv = weighted[key][i];
            distanceBest += Math.pow(wv - idealBest[key], 2);
            distanceWorst += Math.pow(wv - idealWorst[key], 2);
            
            breakdown[key] = {
                raw: bike[key],
                normalized: normalized[key][i],
                weighted: wv
            };
        });
        
        distanceBest = Math.sqrt(distanceBest);
        distanceWorst = Math.sqrt(distanceWorst);
        
        const score = distanceWorst / (distanceBest + distanceWorst) || 0;
        
        return { bike, score: score * 100, breakdown, distanceBest, distanceWorst };
    }).sort((a, b) => b.score - a.score);
}

function calculateVFM(activeCriteria) {
    const qualityCriteria = activeCriteria.filter(k => k !== 'price');
    
    if (qualityCriteria.length === 0 || !activeCriteria.includes('price')) {
        showNotification('VFM requires price and at least one other criterion', 'warning');
        return calculateWSM(activeCriteria);
    }
    
    const totalQualityWeight = qualityCriteria.reduce((sum, key) => sum + state.weights[key], 0);
    const qualityWeights = {};
    qualityCriteria.forEach(key => {
        qualityWeights[key] = state.weights[key] / totalQualityWeight;
    });
    
    const normalized = {};
    qualityCriteria.forEach(key => {
        const values = state.bikes.map(b => b[key]);
        normalized[key] = normalize(values, CRITERIA[key].lowerIsBetter === true);
    });
    
    return state.bikes.map((bike, i) => {
        let qualityScore = 0;
        const breakdown = {};
        
        qualityCriteria.forEach(key => {
            const contribution = normalized[key][i] * qualityWeights[key];
            breakdown[key] = {
                raw: bike[key],
                normalized: normalized[key][i],
                weighted: contribution
            };
            qualityScore += contribution;
        });
        
        const price = bike.price || 1;
        const vfmScore = (qualityScore / price) * 100000;
        
        breakdown.price = { raw: bike.price, normalized: 1 / price, weighted: vfmScore };
        
        return { bike, score: vfmScore, qualityScore: qualityScore * 100, breakdown };
    }).sort((a, b) => b.score - a.score);
}

// ===== Render Results =====
function renderResults(results, activeCriteria) {
    elements.resultsEmpty.style.display = 'none';
    elements.exportBtn.style.display = 'flex';
    
    const existingCards = elements.resultsContainer.querySelectorAll('.result-card');
    existingCards.forEach(card => card.remove());
    
    results.forEach((result, index) => {
        const card = document.createElement('div');
        card.className = `result-card ${index === 0 ? 'winner' : ''}`;
        
        const scoreDisplay = state.method === 'vfm' 
            ? result.score.toFixed(1)
            : result.score.toFixed(1);
        
        // Group breakdown by category
        const breakdownByCategory = {};
        activeCriteria.forEach(key => {
            const cat = CRITERIA[key].category;
            if (!breakdownByCategory[cat]) breakdownByCategory[cat] = [];
            breakdownByCategory[cat].push({ key, ...result.breakdown[key] });
        });
        
        card.innerHTML = `
            <span class="result-rank">#${index + 1}</span>
            <div class="result-header">
                <span class="result-name">
                    ${escapeHtml(result.bike.name)}
                    ${index === 0 ? '<span class="winner-badge">🏆 Best Choice</span>' : ''}
                </span>
                <div class="result-score">
                    <span class="score-value">${scoreDisplay}</span>
                    <span class="score-label">${state.method === 'vfm' ? 'VFM Index' : 'Score'}</span>
                </div>
            </div>
            <div class="result-breakdown-grid">
                ${activeCriteria.slice(0, 10).map(key => {
                    const data = result.breakdown[key];
                    if (!data) return '';
                    return `
                        <div class="breakdown-item-compact">
                            <span class="breakdown-label">${CRITERIA[key].icon}</span>
                            <span class="breakdown-value">${formatValue(data.raw, key)}</span>
                        </div>
                    `;
                }).join('')}
                ${activeCriteria.length > 10 ? `
                    <div class="breakdown-item-compact" style="background: var(--bg-tertiary);">
                        <span class="breakdown-label">+${activeCriteria.length - 10}</span>
                        <span class="breakdown-value">more</span>
                    </div>
                ` : ''}
            </div>
        `;
        
        elements.resultsContainer.appendChild(card);
    });
    
    // Store results for export
    state.lastResults = results;
    state.lastActiveCriteria = activeCriteria;
}

function formatValue(value, criterion) {
    if (value === null || value === undefined) return '-';
    
    const config = CRITERIA[criterion];
    
    switch (criterion) {
        case 'price':
            return `$${value.toLocaleString()}`;
        case 'serviceCost':
            return `$${value}/yr`;
        case 'weight':
            return `${value}kg`;
        case 'engine':
            return `${value}cc`;
        case 'horsepower':
            return `${value}HP`;
        case 'torque':
            return `${value}Nm`;
        case 'topSpeed':
            return `${value}km/h`;
        case 'acceleration':
            return `${value}s`;
        case 'mileage':
            return `${value}km/l`;
        case 'seatHeight':
            return `${value}mm`;
        case 'fuelCapacity':
            return `${value}L`;
        default:
            if (config.unit === '/10') return `${value}/10`;
            return value.toString();
    }
}

function exportResults() {
    if (!state.lastResults) return;
    
    let csv = 'Rank,Motorcycle,Score,' + state.lastActiveCriteria.map(k => CRITERIA[k].name).join(',') + '\n';
    
    state.lastResults.forEach((result, index) => {
        const values = state.lastActiveCriteria.map(k => result.breakdown[k]?.raw ?? '');
        csv += `${index + 1},"${result.bike.name}",${result.score.toFixed(2)},${values.join(',')}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bikescore-comparison-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Results exported to CSV!');
}

// ===== AI Spec Extraction =====
function openAiModal() {
    elements.aiModal.classList.add('active');
    elements.aiInput.value = '';
    elements.aiPreview.style.display = 'none';
    document.getElementById('addExtractedBtn').style.display = 'none';
    extractedBikeData = null;
}

function closeAiModal() {
    elements.aiModal.classList.remove('active');
    elements.aiInput.value = '';
    extractedBikeData = null;
}

function extractSpecs() {
    const text = elements.aiInput.value.trim();
    
    if (!text) {
        showNotification('Please paste some specifications first', 'warning');
        return;
    }
    
    const extractBtn = document.getElementById('extractBtn');
    extractBtn.classList.add('loading');
    extractBtn.textContent = 'Extracting...';
    
    // Simulate a small delay for UX
    setTimeout(() => {
        extractedBikeData = parseSpecsFromText(text);
        renderExtractedPreview();
        
        extractBtn.classList.remove('loading');
        extractBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            Extract Specs
        `;
        
        if (extractedBikeData.name || Object.keys(extractedBikeData).length > 1) {
            showNotification('Specs extracted successfully!', 'success');
        }
    }, 500);
}

function parseSpecsFromText(text) {
    const data = {};
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    
    // Try to extract bike name from first few lines
    const namePatterns = [
        /^((?:Honda|Yamaha|Kawasaki|Suzuki|KTM|Royal Enfield|Bajaj|TVS|Hero|Ducati|BMW|Harley|Triumph|Benelli|Aprilia|MV Agusta|Husqvarna|CFMoto|Jawa|Yezdi)[^0-9]*(?:\d+[^\n]*)?)/i,
        /^([A-Z][a-z]+\s+[A-Z0-9][^\n]{5,50})/,
        /Bike\s*Name\s*[:\-]?\s*(.+)/i,
        /Model\s*[:\-]?\s*(.+)/i
    ];
    
    for (const line of lines.slice(0, 10)) {
        for (const pattern of namePatterns) {
            const match = line.match(pattern);
            if (match && match[1] && match[1].length > 3 && match[1].length < 60) {
                data.name = match[1].trim();
                break;
            }
        }
        if (data.name) break;
    }
    
    // Spec extraction patterns - comprehensive for Indian bike websites
    const patterns = {
        // Price
        price: [
            /(?:Price|Ex-showroom|On-Road|Cost)\s*[:\-]?\s*(?:Rs\.?|₹|INR)?\s*([\d,]+(?:\.\d+)?)\s*(?:Lakh|L|Lac)?/i,
            /(?:Rs\.?|₹|INR)\s*([\d,]+(?:\.\d+)?)\s*(?:Lakh|L|Lac)?/i,
            /\$([\d,]+)/
        ],
        
        // Service Cost
        serviceCost: [
            /(?:Service\s*Cost|Maintenance\s*Cost|Annual\s*Service|Yearly\s*Service)\s*[:\-]?\s*(?:Rs\.?|₹|INR|\$)?\s*([\d,]+)/i,
            /(?:Service\s*Interval)\s*[:\-]?\s*(\d+)\s*(?:km|months)/i
        ],
        
        // Engine
        engine: [
            /(?:Displacement|Engine\s*(?:Capacity)?|CC)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:cc|CC)/i,
            /(\d{2,4})\s*cc/i
        ],
        
        // Power
        horsepower: [
            /(?:Max\.?\s*Power|Power|Bhp|HP|PS)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:bhp|hp|ps|kw)/i,
            /(\d+(?:\.\d+)?)\s*(?:bhp|hp|ps)\s*@/i,
            /(?:Power)\s*[:\-]?\s*(\d+(?:\.\d+)?)/i
        ],
        
        // Torque
        torque: [
            /(?:Max\.?\s*Torque|Torque)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:Nm|nm|NM)/i,
            /(\d+(?:\.\d+)?)\s*Nm\s*@/i
        ],
        
        // Top Speed
        topSpeed: [
            /(?:Top\s*Speed|Max\.?\s*Speed)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:km\/?h|kmph|kph)/i,
            /(\d{2,3})\s*(?:km\/?h|kmph)\s*(?:top|max)/i
        ],
        
        // Acceleration
        acceleration: [
            /(?:0\s*[-–to]+\s*100|Acceleration)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:sec|s|seconds)/i,
            /(\d+(?:\.\d+)?)\s*(?:sec|s|seconds)\s*(?:0\s*[-–to]+\s*100)/i
        ],
        
        // Mileage
        mileage: [
            /(?:Mileage|Fuel\s*Efficiency|FE|ARAI)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:km\/?l|kmpl|km\/ltr)/i,
            /(\d+(?:\.\d+)?)\s*(?:km\/?l|kmpl)/i
        ],
        
        // Weight
        weight: [
            /(?:Kerb\s*Weight|Weight|Dry\s*Weight)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:kg|Kg|KG)/i,
            /(\d{2,3})\s*(?:kg|Kg)\s*(?:kerb|weight)/i
        ],
        
        // Fuel Tank
        fuelCapacity: [
            /(?:Fuel\s*(?:Tank\s*)?Capacity|Tank\s*Capacity|Fuel\s*Tank)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:L|l|ltr|litres?|Litres?)/i,
            /(\d+(?:\.\d+)?)\s*(?:L|litres?)\s*(?:fuel|tank)/i
        ],
        
        // Seat Height
        seatHeight: [
            /(?:Seat\s*Height)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:mm|MM)/i,
            /(\d{3,4})\s*mm\s*(?:seat)/i
        ],
        
        // Ground Clearance (bonus)
        groundClearance: [
            /(?:Ground\s*Clearance)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:mm|MM)/i
        ],
        
        // Wheelbase
        wheelbase: [
            /(?:Wheelbase)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:mm|MM)/i
        ]
    };
    
    // Extract numeric specs
    const fullText = text.toLowerCase();
    
    for (const [key, patternList] of Object.entries(patterns)) {
        for (const pattern of patternList) {
            const match = text.match(pattern);
            if (match && match[1]) {
                let value = parseFloat(match[1].replace(/,/g, ''));
                
                // Handle Lakh conversion for price
                if (key === 'price' && /lakh|lac|l\b/i.test(match[0])) {
                    value = value * 100000;
                }
                
                // Convert to reasonable units if needed
                if (key === 'price' && value < 1000) {
                    value = value * 100000; // Assume Lakhs if small number
                }
                
                data[key] = value;
                break;
            }
        }
    }
    
    // Extract rating-based specs from descriptions
    const ratingSpecs = {
        // Brakes
        frontBrake: /front\s*brake\s*[:\-]?\s*(disc|drum|dual\s*disc|petal\s*disc)/i,
        rearBrake: /rear\s*brake\s*[:\-]?\s*(disc|drum)/i,
        abs: /ABS\s*[:\-]?\s*(yes|no|dual\s*channel|single\s*channel|available|standard)/i,
        
        // Suspension
        frontSuspension: /front\s*suspension\s*[:\-]?\s*(telescopic|USD|upside\s*down|inverted|conventional)/i,
        rearSuspension: /rear\s*suspension\s*[:\-]?\s*(mono\s*shock|twin\s*shock|monoshock|swingarm)/i
    };
    
    for (const [key, pattern] of Object.entries(ratingSpecs)) {
        const match = text.match(pattern);
        if (match && match[1]) {
            const desc = match[1].toLowerCase();
            
            if (key === 'frontBrake') {
                if (desc.includes('dual')) data[key] = 10;
                else if (desc.includes('petal')) data[key] = 9;
                else if (desc.includes('disc')) data[key] = 8;
                else if (desc.includes('drum')) data[key] = 5;
            }
            else if (key === 'rearBrake') {
                if (desc.includes('disc')) data[key] = 8;
                else if (desc.includes('drum')) data[key] = 5;
            }
            else if (key === 'abs') {
                if (desc.includes('dual')) data[key] = 10;
                else if (desc.includes('single')) data[key] = 7;
                else if (desc.includes('yes') || desc.includes('standard') || desc.includes('available')) data[key] = 8;
                else if (desc.includes('no')) data[key] = 0;
            }
            else if (key === 'frontSuspension') {
                if (desc.includes('usd') || desc.includes('upside') || desc.includes('inverted')) data[key] = 9;
                else if (desc.includes('telescopic')) data[key] = 7;
                else data[key] = 6;
            }
            else if (key === 'rearSuspension') {
                if (desc.includes('mono')) data[key] = 8;
                else if (desc.includes('twin')) data[key] = 7;
                else data[key] = 6;
            }
        }
    }
    
    // Check for feature keywords to estimate ratings
    if (fullText.includes('led') && fullText.includes('light')) {
        data.lighting = data.lighting || 8;
    }
    if (fullText.includes('digital') && (fullText.includes('console') || fullText.includes('display') || fullText.includes('cluster'))) {
        data.instrumentation = data.instrumentation || 8;
    }
    if (fullText.includes('tft')) {
        data.instrumentation = 9;
    }
    if (fullText.includes('bluetooth') || fullText.includes('connectivity')) {
        data.electronics = data.electronics || 8;
    }
    if (fullText.includes('riding mode') || fullText.includes('ride mode')) {
        data.electronics = data.electronics || 9;
    }
    if (fullText.includes('traction control') || fullText.includes('tc')) {
        data.electronics = Math.max(data.electronics || 0, 9);
    }
    
    return data;
}

function renderExtractedPreview() {
    if (!extractedBikeData) return;
    
    const specLabels = {
        name: 'Bike Name',
        price: 'Price',
        serviceCost: 'Service Cost/yr',
        engine: 'Engine (cc)',
        horsepower: 'Horsepower',
        torque: 'Torque (Nm)',
        topSpeed: 'Top Speed',
        acceleration: '0-100 km/h',
        mileage: 'Mileage',
        weight: 'Weight (kg)',
        fuelCapacity: 'Fuel Tank (L)',
        seatHeight: 'Seat Height',
        frontBrake: 'Front Brake',
        rearBrake: 'Rear Brake',
        abs: 'ABS',
        frontSuspension: 'Front Susp.',
        rearSuspension: 'Rear Susp.',
        lighting: 'Lighting',
        instrumentation: 'Console',
        electronics: 'Electronics'
    };
    
    const orderedKeys = ['name', 'price', 'serviceCost', 'engine', 'horsepower', 'torque', 'topSpeed', 'acceleration', 
                         'mileage', 'weight', 'fuelCapacity', 'seatHeight', 'frontBrake', 'rearBrake', 
                         'abs', 'frontSuspension', 'rearSuspension', 'lighting', 'instrumentation', 'electronics'];
    
    let html = '';
    let foundCount = 0;
    
    for (const key of orderedKeys) {
        const value = extractedBikeData[key];
        const label = specLabels[key] || key;
        const hasValue = value !== undefined && value !== null;
        
        if (hasValue) foundCount++;
        
        let displayValue = '-';
        if (hasValue) {
            if (key === 'price') {
                displayValue = value >= 100000 
                    ? `₹${(value / 100000).toFixed(2)} Lakh` 
                    : `$${value.toLocaleString()}`;
            } else if (key === 'serviceCost') {
                displayValue = `$${value.toLocaleString()}/yr`;
            } else if (key === 'name') {
                displayValue = value;
            } else if (['frontBrake', 'rearBrake', 'abs', 'frontSuspension', 'rearSuspension', 
                        'lighting', 'instrumentation', 'electronics'].includes(key)) {
                displayValue = `${value}/10`;
            } else {
                displayValue = value.toString();
            }
        }
        
        html += `
            <div class="ai-preview-item ${hasValue ? '' : 'missing'}">
                <span class="ai-preview-label">${label}</span>
                <span class="ai-preview-value">${displayValue}</span>
            </div>
        `;
    }
    
    elements.aiPreviewGrid.innerHTML = html;
    elements.aiPreview.style.display = 'block';
    
    if (foundCount > 0) {
        document.getElementById('addExtractedBtn').style.display = 'flex';
    } else {
        showNotification('Could not extract specs. Try copying more content from the specifications table.', 'warning');
    }
}

function addExtractedBike() {
    if (!extractedBikeData) return;
    
    if (!extractedBikeData.name) {
        extractedBikeData.name = 'Imported Bike ' + (state.bikes.length + 1);
    }
    
    const bikeData = {
        id: generateId(),
        name: extractedBikeData.name,
        price: extractedBikeData.price || null,
        serviceCost: extractedBikeData.serviceCost || null,
        engine: extractedBikeData.engine || null,
        horsepower: extractedBikeData.horsepower || null,
        torque: extractedBikeData.torque || null,
        topSpeed: extractedBikeData.topSpeed || null,
        acceleration: extractedBikeData.acceleration || null,
        mileage: extractedBikeData.mileage || null,
        weight: extractedBikeData.weight || null,
        seatHeight: extractedBikeData.seatHeight || null,
        fuelCapacity: extractedBikeData.fuelCapacity || null,
        frontBrake: extractedBikeData.frontBrake || null,
        rearBrake: extractedBikeData.rearBrake || null,
        abs: extractedBikeData.abs || null,
        frontSuspension: extractedBikeData.frontSuspension || null,
        rearSuspension: extractedBikeData.rearSuspension || null,
        comfort: null,
        ergonomics: null,
        windProtection: null,
        instrumentation: extractedBikeData.instrumentation || null,
        lighting: extractedBikeData.lighting || null,
        electronics: extractedBikeData.electronics || null,
        buildQuality: null,
        reliability: null
    };
    
    state.bikes.push(bikeData);
    saveToStorage();
    closeAiModal();
    updateUI();
    
    showNotification(`${bikeData.name} added successfully!`);
}

// ===== Utilities =====
function generateId() {
    return 'bike_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'warning' ? '#f7c948' : '#00d4aa'};
        color: ${type === 'warning' ? '#1a1e28' : '#0a0c10'};
        border-radius: 12px;
        font-weight: 600;
        font-size: 0.9rem;
        z-index: 2000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;
    
    if (!document.getElementById('notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
