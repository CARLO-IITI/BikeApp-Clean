/**
 * BikeScore v2.0 - Complete Motorcycle Comparison Tool
 * Features: WSM, TOPSIS, VFM, AHP, Weight Templates, Radar Chart, Share URL, PWA
 */

// ===== Criteria Configuration =====
const CRITERIA = {
    price: { name: 'Price', icon: '💰', category: 'price', lowerIsBetter: true, unit: '$', defaultWeight: 12 },
    serviceCost: { name: 'Service Cost', icon: '🔧', category: 'price', lowerIsBetter: true, unit: '$/yr', defaultWeight: 8 },
    engine: { name: 'Engine', icon: '🔥', category: 'performance', lowerIsBetter: false, unit: 'cc', defaultWeight: 8 },
    horsepower: { name: 'Horsepower', icon: '🐎', category: 'performance', lowerIsBetter: false, unit: 'HP', defaultWeight: 10 },
    torque: { name: 'Torque', icon: '💪', category: 'performance', lowerIsBetter: false, unit: 'Nm', defaultWeight: 8 },
    topSpeed: { name: 'Top Speed', icon: '🚀', category: 'performance', lowerIsBetter: false, unit: 'km/h', defaultWeight: 5 },
    acceleration: { name: '0-100 km/h', icon: '⏱️', category: 'performance', lowerIsBetter: true, unit: 's', defaultWeight: 6 },
    mileage: { name: 'Mileage', icon: '⛽', category: 'performance', lowerIsBetter: false, unit: 'km/l', defaultWeight: 8 },
    weight: { name: 'Weight', icon: '⚖️', category: 'performance', lowerIsBetter: true, unit: 'kg', defaultWeight: 5 },
    fuelCapacity: { name: 'Fuel Tank', icon: '🛢️', category: 'performance', lowerIsBetter: false, unit: 'L', defaultWeight: 3 },
    seatHeight: { name: 'Seat Height', icon: '📏', category: 'comfort', lowerIsBetter: null, unit: 'mm', defaultWeight: 2 },
    comfort: { name: 'Seat Comfort', icon: '🛋️', category: 'comfort', lowerIsBetter: false, unit: '/10', defaultWeight: 5 },
    ergonomics: { name: 'Riding Position', icon: '🧘', category: 'comfort', lowerIsBetter: false, unit: '/10', defaultWeight: 4 },
    windProtection: { name: 'Wind Protection', icon: '🌬️', category: 'comfort', lowerIsBetter: false, unit: '/10', defaultWeight: 3 },
    frontBrake: { name: 'Front Brake', icon: '🛑', category: 'safety', lowerIsBetter: false, unit: '/10', defaultWeight: 4 },
    rearBrake: { name: 'Rear Brake', icon: '🔴', category: 'safety', lowerIsBetter: false, unit: '/10', defaultWeight: 3 },
    abs: { name: 'ABS Quality', icon: '🅰️', category: 'safety', lowerIsBetter: false, unit: '/10', defaultWeight: 5 },
    frontSuspension: { name: 'Front Suspension', icon: '🔧', category: 'safety', lowerIsBetter: false, unit: '/10', defaultWeight: 4 },
    rearSuspension: { name: 'Rear Suspension', icon: '⚙️', category: 'safety', lowerIsBetter: false, unit: '/10', defaultWeight: 4 },
    instrumentation: { name: 'Instrumentation', icon: '📊', category: 'features', lowerIsBetter: false, unit: '/10', defaultWeight: 3 },
    lighting: { name: 'Lighting', icon: '💡', category: 'features', lowerIsBetter: false, unit: '/10', defaultWeight: 2 },
    electronics: { name: 'Electronics/Modes', icon: '🎛️', category: 'features', lowerIsBetter: false, unit: '/10', defaultWeight: 4 },
    buildQuality: { name: 'Build Quality', icon: '🏗️', category: 'features', lowerIsBetter: false, unit: '/10', defaultWeight: 5 },
    reliability: { name: 'Reliability', icon: '✅', category: 'features', lowerIsBetter: false, unit: '/10', defaultWeight: 6 }
};

const CRITERIA_KEYS = Object.keys(CRITERIA);
const CATEGORIES = {
    price: { name: 'Price', icon: '💰' },
    performance: { name: 'Performance', icon: '⚡' },
    comfort: { name: 'Comfort', icon: '🛋️' },
    safety: { name: 'Safety', icon: '🛡️' },
    features: { name: 'Features', icon: '✨' }
};

// Weight Templates
const WEIGHT_TEMPLATES = {
    speedLover: { name: '🏎️ Speed Lover', weights: { price: 5, serviceCost: 3, engine: 15, horsepower: 20, torque: 15, topSpeed: 15, acceleration: 12, mileage: 2, weight: 8, fuelCapacity: 2, seatHeight: 0, comfort: 1, ergonomics: 1, windProtection: 1, frontBrake: 5, rearBrake: 3, abs: 5, frontSuspension: 5, rearSuspension: 5, instrumentation: 2, lighting: 1, electronics: 5, buildQuality: 3, reliability: 3 }},
    dailyCommuter: { name: '🛵 Daily Commuter', weights: { price: 15, serviceCost: 12, engine: 5, horsepower: 5, torque: 5, topSpeed: 2, acceleration: 3, mileage: 20, weight: 8, fuelCapacity: 5, seatHeight: 3, comfort: 10, ergonomics: 8, windProtection: 3, frontBrake: 4, rearBrake: 3, abs: 5, frontSuspension: 3, rearSuspension: 3, instrumentation: 3, lighting: 4, electronics: 3, buildQuality: 5, reliability: 10 }},
    budgetBuyer: { name: '💵 Budget Buyer', weights: { price: 25, serviceCost: 20, engine: 3, horsepower: 5, torque: 3, topSpeed: 2, acceleration: 2, mileage: 15, weight: 3, fuelCapacity: 3, seatHeight: 2, comfort: 5, ergonomics: 3, windProtection: 2, frontBrake: 3, rearBrake: 2, abs: 4, frontSuspension: 2, rearSuspension: 2, instrumentation: 2, lighting: 2, electronics: 2, buildQuality: 5, reliability: 10 }},
    longRider: { name: '🛣️ Long Distance Rider', weights: { price: 8, serviceCost: 8, engine: 8, horsepower: 8, torque: 10, topSpeed: 3, acceleration: 2, mileage: 12, weight: 3, fuelCapacity: 10, seatHeight: 3, comfort: 15, ergonomics: 12, windProtection: 10, frontBrake: 4, rearBrake: 3, abs: 5, frontSuspension: 5, rearSuspension: 5, instrumentation: 4, lighting: 4, electronics: 5, buildQuality: 6, reliability: 10 }},
    safetyFirst: { name: '🛡️ Safety First', weights: { price: 8, serviceCost: 5, engine: 3, horsepower: 3, torque: 3, topSpeed: 2, acceleration: 2, mileage: 5, weight: 5, fuelCapacity: 3, seatHeight: 3, comfort: 5, ergonomics: 5, windProtection: 3, frontBrake: 12, rearBrake: 10, abs: 15, frontSuspension: 10, rearSuspension: 10, instrumentation: 3, lighting: 8, electronics: 8, buildQuality: 8, reliability: 10 }},
    allRounder: { name: '⚖️ All-Rounder', weights: { price: 8, serviceCost: 5, engine: 5, horsepower: 7, torque: 5, topSpeed: 4, acceleration: 4, mileage: 7, weight: 4, fuelCapacity: 4, seatHeight: 2, comfort: 6, ergonomics: 5, windProtection: 4, frontBrake: 5, rearBrake: 4, abs: 6, frontSuspension: 5, rearSuspension: 5, instrumentation: 4, lighting: 3, electronics: 5, buildQuality: 6, reliability: 8 }},
    trackDay: { name: '🏁 Track Day', weights: { price: 3, serviceCost: 2, engine: 12, horsepower: 18, torque: 12, topSpeed: 12, acceleration: 15, mileage: 1, weight: 12, fuelCapacity: 2, seatHeight: 0, comfort: 1, ergonomics: 3, windProtection: 2, frontBrake: 10, rearBrake: 6, abs: 8, frontSuspension: 10, rearSuspension: 10, instrumentation: 3, lighting: 1, electronics: 8, buildQuality: 5, reliability: 4 }},
    newRider: { name: '🔰 New Rider', weights: { price: 15, serviceCost: 10, engine: 3, horsepower: 3, torque: 3, topSpeed: 2, acceleration: 2, mileage: 10, weight: 8, fuelCapacity: 4, seatHeight: 8, comfort: 8, ergonomics: 8, windProtection: 3, frontBrake: 5, rearBrake: 4, abs: 10, frontSuspension: 4, rearSuspension: 4, instrumentation: 3, lighting: 4, electronics: 3, buildQuality: 6, reliability: 12 }}
};

const METHOD_INFO = {
    wsm: { emoji: '⭐', title: 'Best Overall', badge: 'recommended', badgeText: 'Recommended', simple: 'Add up all the good things about each bike, weighted by what matters to you.', example: 'If you care 50% about power and 50% about mileage, a bike with great power but poor mileage scores the same as one with great mileage but poor power.', bestFor: 'First-time buyers, general comparisons' },
    vfm: { emoji: '💰', title: 'Best Value for Money', badge: 'budget', badgeText: 'Budget-Friendly', simple: 'Find which bike gives you the most features and quality for every rupee spent.', example: 'A ₹1 Lakh bike with score 80 beats a ₹2 Lakh bike with score 100.', bestFor: 'Budget buyers, value seekers' },
    topsis: { emoji: '🎯', title: 'Closest to Perfect', badge: 'precision', badgeText: 'Precision', simple: 'Find the bike nearest to your "dream bike" and farthest from your "nightmare bike".', example: 'Finds which real bike comes closest to the imaginary perfect bike.', bestFor: 'Experienced riders, specific requirements' },
    ahp: { emoji: '🤔', title: 'Help Me Decide', badge: 'guided', badgeText: 'Guided', simple: 'Answer simple questions like "Is power more important than mileage?" and we figure out your priorities.', example: 'We ask comparisons to understand what you really want.', bestFor: 'Confused buyers, need guidance' }
};

// ===== State Management =====
const state = {
    bikes: [],
    weights: {},
    method: 'wsm',
    ahpMatrix: null,
    activeCategory: 'all',
    seatHeightPreference: 'ignore', // 'lower', 'higher', 'ignore'
    showMath: false,
    showRadar: false,
    showTable: false,
    lastResults: null,
    lastActiveCriteria: null
};

// Initialize default weights
CRITERIA_KEYS.forEach(key => { state.weights[key] = CRITERIA[key].defaultWeight; });

// ===== DOM Elements =====
let elements = {};

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    initElements();
    initEventListeners();
    loadFromStorage();
    loadFromURL();
    renderWeightsList();
    updateUI();
    registerServiceWorker();
});

function initElements() {
    elements = {
        bikesList: document.getElementById('bikesList'),
        emptyState: document.getElementById('emptyState'),
        resultsContainer: document.getElementById('resultsContainer'),
        resultsEmpty: document.getElementById('resultsEmpty'),
        resultsActions: document.getElementById('resultsActions'),
        methodInfo: document.getElementById('methodInfo'),
        totalWeight: document.getElementById('totalWeight'),
        weightsList: document.getElementById('weightsList'),
        weightProgressBar: document.getElementById('weightProgressBar'),
        weightStatus: document.getElementById('weightStatus'),
        weightTip: document.getElementById('weightTip'),
        exportBtn: document.getElementById('exportBtn'),
        shareSection: document.getElementById('shareSection'),
        templateSelect: document.getElementById('templateSelect'),
        radarChartContainer: document.getElementById('radarChartContainer'),
        comparisonTableContainer: document.getElementById('comparisonTableContainer'),
        bikeModal: document.getElementById('bikeModal'),
        bikeForm: document.getElementById('bikeForm'),
        modalTitle: document.getElementById('modalTitle'),
        bikeId: document.getElementById('bikeId'),
        ahpModal: document.getElementById('ahpModal'),
        ahpComparisons: document.getElementById('ahpComparisons'),
        aiModal: document.getElementById('aiModal'),
        aiInput: document.getElementById('aiInput'),
        aiPreview: document.getElementById('aiPreview'),
        aiPreviewGrid: document.getElementById('aiPreviewGrid'),
        seatHeightModal: document.getElementById('seatHeightModal'),
        shareModal: document.getElementById('shareModal'),
        shareUrl: document.getElementById('shareUrl'),
        importModal: document.getElementById('importModal')
    };
}

function initEventListeners() {
    // Bike management
    document.getElementById('addBikeBtn').addEventListener('click', () => openBikeModal());
    document.getElementById('closeModal').addEventListener('click', closeBikeModal);
    document.getElementById('cancelBtn').addEventListener('click', closeBikeModal);
    elements.bikeForm.addEventListener('submit', handleBikeSubmit);
    
    // AI Import
    document.getElementById('aiImportBtn').addEventListener('click', openAiModal);
    document.getElementById('closeAiModal').addEventListener('click', closeAiModal);
    document.getElementById('cancelAiBtn').addEventListener('click', closeAiModal);
    document.getElementById('extractBtn').addEventListener('click', extractSpecs);
    document.getElementById('addExtractedBtn').addEventListener('click', addExtractedBike);
    
    // AHP Modal
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
    
    // Weight controls
    document.getElementById('resetWeights').addEventListener('click', resetWeights);
    document.getElementById('equalizeWeights').addEventListener('click', equalizeWeights);
    document.getElementById('fixTo100').addEventListener('click', fixWeightsTo100);
    elements.templateSelect.addEventListener('change', applyWeightTemplate);
    
    // Compare & results
    document.getElementById('compareBtn').addEventListener('click', calculateScores);
    elements.exportBtn.addEventListener('click', exportResults);
    document.getElementById('showMathBtn')?.addEventListener('click', toggleShowMath);
    document.getElementById('radarChartBtn')?.addEventListener('click', toggleRadarChart);
    document.getElementById('compareTableBtn')?.addEventListener('click', toggleComparisonTable);
    
    // Share & Data
    document.getElementById('shareBtn')?.addEventListener('click', openShareModal);
    document.getElementById('closeShareModal')?.addEventListener('click', () => elements.shareModal.classList.remove('active'));
    document.getElementById('copyShareUrl')?.addEventListener('click', copyShareUrl);
    document.getElementById('exportDataBtn')?.addEventListener('click', exportAllData);
    document.getElementById('importDataBtn')?.addEventListener('click', () => elements.importModal.classList.add('active'));
    document.getElementById('closeImportModal')?.addEventListener('click', () => elements.importModal.classList.remove('active'));
    document.getElementById('cancelImportBtn')?.addEventListener('click', () => elements.importModal.classList.remove('active'));
    document.getElementById('confirmImportBtn')?.addEventListener('click', importAllData);
    
    // Seat height modal
    document.getElementById('closeSeatHeightModal')?.addEventListener('click', () => elements.seatHeightModal.classList.remove('active'));
    document.querySelectorAll('.seat-option').forEach(opt => {
        opt.addEventListener('click', () => setSeatHeightPreference(opt.dataset.value));
    });
    
    // Modal overlays
    [elements.bikeModal, elements.ahpModal, elements.aiModal, elements.seatHeightModal, elements.shareModal, elements.importModal].forEach(modal => {
        modal?.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
    });
}

// ===== Storage =====
function saveToStorage() {
    localStorage.setItem('bikeScore_bikes', JSON.stringify(state.bikes));
    localStorage.setItem('bikeScore_weights', JSON.stringify(state.weights));
    localStorage.setItem('bikeScore_method', state.method);
    localStorage.setItem('bikeScore_seatPref', state.seatHeightPreference);
}

function loadFromStorage() {
    try {
        const bikes = localStorage.getItem('bikeScore_bikes');
        const weights = localStorage.getItem('bikeScore_weights');
        const method = localStorage.getItem('bikeScore_method');
        const seatPref = localStorage.getItem('bikeScore_seatPref');
        
        if (bikes) state.bikes = JSON.parse(bikes);
        if (weights) {
            const saved = JSON.parse(weights);
            CRITERIA_KEYS.forEach(key => { if (saved[key] !== undefined) state.weights[key] = saved[key]; });
        }
        if (method) state.method = method;
        if (seatPref) state.seatHeightPreference = seatPref;
        selectMethod(state.method, false);
    } catch (e) { console.error('Error loading storage:', e); }
}

// ===== URL Sharing =====
function loadFromURL() {
    try {
        const hash = window.location.hash.slice(1);
        if (!hash) return;
        const data = JSON.parse(decodeURIComponent(atob(hash)));
        if (data.bikes) state.bikes = data.bikes;
        if (data.weights) Object.assign(state.weights, data.weights);
        if (data.method) state.method = data.method;
        showNotification('Loaded shared comparison!');
    } catch (e) { /* Invalid hash, ignore */ }
}

function generateShareUrl() {
    const data = { bikes: state.bikes, weights: state.weights, method: state.method };
    const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
    return `${window.location.origin}${window.location.pathname}#${encoded}`;
}

function openShareModal() {
    elements.shareUrl.value = generateShareUrl();
    elements.shareModal.classList.add('active');
}

function copyShareUrl() {
    elements.shareUrl.select();
    document.execCommand('copy');
    showNotification('Link copied to clipboard!');
}

// ===== Data Import/Export =====
function exportAllData() {
    const data = { bikes: state.bikes, weights: state.weights, method: state.method, seatPref: state.seatHeightPreference, exportDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bikescore-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Data exported!');
}

function importAllData() {
    try {
        const data = JSON.parse(document.getElementById('importData').value);
        if (data.bikes) state.bikes = data.bikes;
        if (data.weights) Object.assign(state.weights, data.weights);
        if (data.method) state.method = data.method;
        saveToStorage();
        renderWeightsList();
        updateUI();
        elements.importModal.classList.remove('active');
        showNotification('Data imported successfully!');
    } catch (e) {
        showNotification('Invalid JSON data', 'warning');
    }
}

// ===== Weight Templates =====
function applyWeightTemplate() {
    const templateKey = elements.templateSelect.value;
    if (!templateKey || !WEIGHT_TEMPLATES[templateKey]) return;
    
    const template = WEIGHT_TEMPLATES[templateKey];
    CRITERIA_KEYS.forEach(key => {
        if (template.weights[key] !== undefined) {
            state.weights[key] = template.weights[key];
            const slider = document.getElementById(`${key}Weight`);
            if (slider) {
                slider.value = template.weights[key];
                document.getElementById(`${key}WeightValue`).textContent = `${template.weights[key]}%`;
            }
        }
    });
    
    updateWeightGuidance();
    saveToStorage();
    showNotification(`Applied "${template.name}" template!`);
    elements.templateSelect.value = '';
}

function fixWeightsTo100() {
    const total = Object.values(state.weights).reduce((sum, w) => sum + w, 0);
    if (total === 0) return;
    
    const scale = 100 / total;
    let newTotal = 0;
    
    CRITERIA_KEYS.forEach(key => {
        state.weights[key] = Math.round(state.weights[key] * scale);
        newTotal += state.weights[key];
        const slider = document.getElementById(`${key}Weight`);
        if (slider) {
            slider.value = state.weights[key];
            document.getElementById(`${key}WeightValue`).textContent = `${state.weights[key]}%`;
        }
    });
    
    // Fix rounding errors
    if (newTotal !== 100) {
        const diff = 100 - newTotal;
        const maxKey = CRITERIA_KEYS.reduce((a, b) => state.weights[a] > state.weights[b] ? a : b);
        state.weights[maxKey] += diff;
        document.getElementById(`${maxKey}WeightValue`).textContent = `${state.weights[maxKey]}%`;
        document.getElementById(`${maxKey}Weight`).value = state.weights[maxKey];
    }
    
    updateWeightGuidance();
    saveToStorage();
    showNotification('Weights adjusted to 100%!');
}

// ===== Render Weights List =====
function renderWeightsList() {
    const categoryGroups = {};
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
                    <div class="weight-item" data-criterion="${key}">
                        <div class="weight-label">
                            <span class="weight-icon">${CRITERIA[key].icon}</span>
                            <span>${CRITERIA[key].name}</span>
                            <span class="weight-value" id="${key}WeightValue">${state.weights[key]}%</span>
                        </div>
                        <input type="range" min="0" max="30" value="${state.weights[key]}" class="weight-slider" id="${key}Weight" data-criterion="${key}">
                        <span class="weight-note">${CRITERIA[key].lowerIsBetter === true ? 'Lower is better' : CRITERIA[key].lowerIsBetter === false ? 'Higher is better' : 'Preference varies'}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.weight-slider').forEach(slider => slider.addEventListener('input', handleWeightChange));
    updateWeightGuidance();
    filterWeightsByCategory();
}

window.toggleCategory = function(category) {
    document.querySelector(`.weight-category[data-category="${category}"]`)?.classList.toggle('collapsed');
};

function selectCategory(category) {
    state.activeCategory = category;
    document.querySelectorAll('.category-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.category === category));
    filterWeightsByCategory();
}

function filterWeightsByCategory() {
    document.querySelectorAll('.weight-category').forEach(cat => {
        cat.style.display = (state.activeCategory === 'all' || cat.dataset.category === state.activeCategory) ? '' : 'none';
    });
}

function handleWeightChange(e) {
    const criterion = e.target.dataset.criterion;
    const value = parseInt(e.target.value);
    state.weights[criterion] = value;
    document.getElementById(`${criterion}WeightValue`).textContent = `${value}%`;
    updateWeightGuidance();
    saveToStorage();
}

function updateWeightGuidance() {
    const total = Object.values(state.weights).reduce((sum, w) => sum + w, 0);
    elements.totalWeight.textContent = total;
    
    const bar = elements.weightProgressBar;
    const status = elements.weightStatus;
    const tip = elements.weightTip;
    
    bar.style.width = `${Math.min(total, 150)}%`;
    
    if (total >= 95 && total <= 105) {
        bar.className = 'weight-progress-bar';
        elements.totalWeight.className = 'weight-total good';
        status.textContent = '✓ Perfect';
        status.className = 'weight-status good';
        tip.textContent = 'Your weights are well-balanced!';
    } else if (total >= 80 && total <= 120) {
        bar.className = 'weight-progress-bar warning';
        elements.totalWeight.className = 'weight-total warning';
        status.textContent = '⚠ Close';
        status.className = 'weight-status warning';
        tip.textContent = total < 100 ? 'Consider increasing some weights.' : 'Consider reducing some weights.';
    } else {
        bar.className = 'weight-progress-bar danger';
        elements.totalWeight.className = 'weight-total danger';
        status.textContent = '✗ Off';
        status.className = 'weight-status danger';
        tip.textContent = total < 80 ? 'Too low! Add more importance to criteria.' : 'Too high! Reduce some weights or use "Fix to 100%".';
    }
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
    updateWeightGuidance();
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
    updateWeightGuidance();
    saveToStorage();
}

// ===== UI Updates =====
function updateUI() {
    renderBikesList();
    updateWeightGuidance();
    updateMethodInfo();
    elements.shareSection.style.display = state.bikes.length > 0 ? 'block' : 'none';
}

function renderBikesList() {
    if (state.bikes.length === 0) {
        elements.emptyState.style.display = 'flex';
        return;
    }
    elements.emptyState.style.display = 'none';
    document.querySelectorAll('.bike-card').forEach(card => card.remove());
    state.bikes.forEach(bike => elements.bikesList.appendChild(createBikeCard(bike)));
}

function createBikeCard(bike) {
    const card = document.createElement('div');
    card.className = 'bike-card';
    card.dataset.id = bike.id;
    
    const keySpecs = [
        { label: 'Price', value: `$${(bike.price || 0).toLocaleString()}` },
        { label: 'HP', value: bike.horsepower || '-' },
        { label: 'Torque', value: bike.torque ? `${bike.torque}Nm` : '-' },
        { label: 'Mileage', value: bike.mileage ? `${bike.mileage}km/l` : '-' },
        { label: 'Weight', value: bike.weight ? `${bike.weight}kg` : '-' },
        { label: 'Engine', value: bike.engine ? `${bike.engine}cc` : '-' }
    ];
    
    // Derived stats
    const pwRatio = bike.horsepower && bike.weight ? (bike.horsepower / bike.weight).toFixed(2) : null;
    const range = bike.mileage && bike.fuelCapacity ? Math.round(bike.mileage * bike.fuelCapacity) : null;
    
    card.innerHTML = `
        <div class="bike-card-header">
            <span class="bike-name">
                ${bike.imageUrl ? `<img src="${bike.imageUrl}" class="bike-thumb" alt="" onerror="this.style.display='none'">` : ''}
                ${escapeHtml(bike.name)}
            </span>
            <div class="bike-actions">
                <button class="clone" title="Clone" onclick="cloneBike('${bike.id}')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                </button>
                <button class="edit" title="Edit" onclick="editBike('${bike.id}')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button class="delete" title="Delete" onclick="deleteBike('${bike.id}')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                </button>
            </div>
        </div>
        <div class="bike-specs-grid">
            ${keySpecs.map(spec => `<div class="bike-spec-compact"><span class="bike-spec-label">${spec.label}</span><span class="bike-spec-value">${spec.value}</span></div>`).join('')}
        </div>
        ${pwRatio || range ? `<div class="derived-stats">
            ${pwRatio ? `<div class="derived-stat"><span class="derived-stat-label">P/W:</span><span class="derived-stat-value">${pwRatio}</span></div>` : ''}
            ${range ? `<div class="derived-stat"><span class="derived-stat-label">Range:</span><span class="derived-stat-value">${range}km</span></div>` : ''}
        </div>` : ''}
    `;
    return card;
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
            <div class="info-example"><span class="example-label">Example:</span> ${info.example}</div>
            <div class="info-best-for"><span>✓ Best for:</span> ${info.bestFor}</div>
        </div>
    `;
}

// ===== Bike Modal =====
function openBikeModal(bikeId = null) {
    if (bikeId) {
        const bike = state.bikes.find(b => b.id === bikeId);
        if (bike) {
            elements.modalTitle.textContent = 'Edit Motorcycle';
            elements.bikeId.value = bike.id;
            const fields = ['Name', 'Price', 'ServiceCost', 'ImageUrl', 'Engine', 'Horsepower', 'Torque', 'TopSpeed', 'Acceleration', 'Mileage', 'Weight', 'SeatHeight', 'FuelCapacity', 'FrontBrake', 'RearBrake', 'ABS', 'FrontSuspension', 'RearSuspension', 'Comfort', 'Ergonomics', 'WindProtection', 'Instrumentation', 'Lighting', 'Electronics', 'BuildQuality', 'Reliability'];
            fields.forEach(f => {
                const prop = f.charAt(0).toLowerCase() + f.slice(1);
                const el = document.getElementById(`bike${f}`);
                if (el && bike[prop] !== undefined) el.value = bike[prop];
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
    const getVal = (id) => { const el = document.getElementById(id); const v = el?.value; return v === '' ? null : (el?.type === 'number' ? parseFloat(v) : v); };
    
    const bikeData = {
        id: elements.bikeId.value || generateId(),
        name: document.getElementById('bikeName').value.trim(),
        price: getVal('bikePrice'), serviceCost: getVal('bikeServiceCost'), imageUrl: getVal('bikeImageUrl'),
        engine: getVal('bikeEngine'), horsepower: getVal('bikeHorsepower'), torque: getVal('bikeTorque'),
        topSpeed: getVal('bikeTopSpeed'), acceleration: getVal('bikeAcceleration'), mileage: getVal('bikeMileage'),
        weight: getVal('bikeWeight'), seatHeight: getVal('bikeSeatHeight'), fuelCapacity: getVal('bikeFuelCapacity'),
        frontBrake: getVal('bikeFrontBrake'), rearBrake: getVal('bikeRearBrake'), abs: getVal('bikeABS'),
        frontSuspension: getVal('bikeFrontSuspension'), rearSuspension: getVal('bikeRearSuspension'),
        comfort: getVal('bikeComfort'), ergonomics: getVal('bikeErgonomics'), windProtection: getVal('bikeWindProtection'),
        instrumentation: getVal('bikeInstrumentation'), lighting: getVal('bikeLighting'), electronics: getVal('bikeElectronics'),
        buildQuality: getVal('bikeBuildQuality'), reliability: getVal('bikeReliability')
    };
    
    if (elements.bikeId.value) {
        const idx = state.bikes.findIndex(b => b.id === bikeData.id);
        if (idx !== -1) state.bikes[idx] = bikeData;
    } else {
        state.bikes.push(bikeData);
    }
    
    saveToStorage();
    closeBikeModal();
    updateUI();
}

window.editBike = function(id) { openBikeModal(id); };
window.deleteBike = function(id) {
    if (confirm('Delete this motorcycle?')) {
        state.bikes = state.bikes.filter(b => b.id !== id);
        saveToStorage();
        updateUI();
        elements.resultsContainer.innerHTML = '';
        elements.resultsContainer.appendChild(elements.resultsEmpty);
        elements.resultsEmpty.style.display = 'flex';
        elements.resultsActions.style.display = 'none';
    }
};
window.cloneBike = function(id) {
    const bike = state.bikes.find(b => b.id === id);
    if (bike) {
        const clone = { ...bike, id: generateId(), name: `${bike.name} (Copy)` };
        state.bikes.push(clone);
        saveToStorage();
        updateUI();
        showNotification('Bike cloned!');
    }
};

// ===== Method & Seat Height =====
function selectMethod(method, save = true) {
    state.method = method;
    document.querySelectorAll('.method-card').forEach(card => card.classList.toggle('active', card.dataset.method === method));
    updateMethodInfo();
    if (save) saveToStorage();
}

function setSeatHeightPreference(value) {
    state.seatHeightPreference = value;
    document.querySelectorAll('.seat-option').forEach(opt => opt.classList.toggle('active', opt.dataset.value === value));
    CRITERIA.seatHeight.lowerIsBetter = value === 'lower' ? true : value === 'higher' ? false : null;
    saveToStorage();
    elements.seatHeightModal.classList.remove('active');
    showNotification(`Seat height preference: ${value}`);
}

// ===== AHP =====
function openAhpModal() {
    generateAhpComparisons();
    elements.ahpModal.classList.add('active');
}
function closeAhpModal() { elements.ahpModal.classList.remove('active'); }

function generateAhpComparisons() {
    const categoryKeys = Object.keys(CATEGORIES);
    const pairs = [];
    for (let i = 0; i < categoryKeys.length; i++) {
        for (let j = i + 1; j < categoryKeys.length; j++) pairs.push([categoryKeys[i], categoryKeys[j]]);
    }
    
    state.ahpMatrix = {};
    pairs.forEach(([a, b]) => { state.ahpMatrix[`${a}_${b}`] = 1; });
    
    const scaleLabels = { '1/9': '9×', '1/7': '7×', '1/5': '5×', '1/3': '3×', '1': '=', '3': '3×', '5': '5×', '7': '7×', '9': '9×' };
    
    elements.ahpComparisons.innerHTML = pairs.map(([a, b]) => `
        <div class="ahp-pair" data-pair="${a}_${b}">
            <div class="ahp-pair-header">
                <span class="ahp-criterion">${CATEGORIES[a].icon} ${CATEGORIES[a].name}</span>
                <span class="ahp-vs">vs</span>
                <span class="ahp-criterion">${CATEGORIES[b].icon} ${CATEGORIES[b].name}</span>
            </div>
            <div class="ahp-scale">
                ${Object.entries(scaleLabels).map(([value, label]) => `<button data-value="${value}" class="${value === '1' ? 'active' : ''}">${label}</button>`).join('')}
            </div>
        </div>
    `).join('');
    
    elements.ahpComparisons.querySelectorAll('.ahp-scale button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const pair = e.target.closest('.ahp-pair');
            pair.querySelectorAll('.ahp-scale button').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            state.ahpMatrix[pair.dataset.pair] = evalFraction(e.target.dataset.value);
        });
    });
}

function evalFraction(str) {
    if (str.includes('/')) { const [n, d] = str.split('/').map(Number); return n / d; }
    return parseFloat(str);
}

function applyAhpWeights() {
    const categoryKeys = Object.keys(CATEGORIES);
    const n = categoryKeys.length;
    const matrix = Array(n).fill(null).map(() => Array(n).fill(1));
    
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const val = state.ahpMatrix[`${categoryKeys[i]}_${categoryKeys[j]}`] || 1;
            matrix[i][j] = val;
            matrix[j][i] = 1 / val;
        }
    }
    
    const geoMeans = matrix.map(row => Math.pow(row.reduce((a, v) => a * v, 1), 1 / n));
    const sum = geoMeans.reduce((a, v) => a + v, 0);
    const catPriorities = {};
    categoryKeys.forEach((key, i) => { catPriorities[key] = geoMeans[i] / sum; });
    
    const catCounts = {};
    CRITERIA_KEYS.forEach(key => { const cat = CRITERIA[key].category; catCounts[cat] = (catCounts[cat] || 0) + 1; });
    
    CRITERIA_KEYS.forEach(key => {
        const cat = CRITERIA[key].category;
        state.weights[key] = Math.round((catPriorities[cat] * 100) / catCounts[cat]);
        const slider = document.getElementById(`${key}Weight`);
        if (slider) {
            slider.value = state.weights[key];
            document.getElementById(`${key}WeightValue`).textContent = `${state.weights[key]}%`;
        }
    });
    
    updateWeightGuidance();
    saveToStorage();
    closeAhpModal();
    showNotification('AHP weights applied!');
}

// ===== Scoring Algorithms =====
function calculateScores() {
    if (state.bikes.length < 2) { showNotification('Add at least 2 motorcycles to compare', 'warning'); return; }
    if (state.method === 'ahp' && !state.ahpMatrix) { openAhpModal(); return; }
    
    const activeCriteria = CRITERIA_KEYS.filter(key => {
        const vals = state.bikes.map(b => b[key]).filter(v => v !== null && v !== undefined);
        return vals.length >= 2 && state.weights[key] > 0;
    });
    
    if (activeCriteria.length === 0) { showNotification('Not enough data. Fill in more specifications.', 'warning'); return; }
    
    let results;
    switch (state.method) {
        case 'topsis': results = calculateTOPSIS(activeCriteria); break;
        case 'vfm': results = calculateVFM(activeCriteria); break;
        default: results = calculateWSM(activeCriteria);
    }
    
    state.lastResults = results;
    state.lastActiveCriteria = activeCriteria;
    renderResults(results, activeCriteria);
}

function normalize(values, lowerIsBetter = false) {
    const valid = values.filter(v => v !== null && v !== undefined);
    if (valid.length === 0) return values.map(() => 0.5);
    const min = Math.min(...valid), max = Math.max(...valid);
    if (max === min) return values.map(v => v !== null ? 1 : 0.5);
    return values.map(v => {
        if (v === null || v === undefined) return 0.5;
        const norm = (v - min) / (max - min);
        return lowerIsBetter ? (1 - norm) : norm;
    });
}

function calculateWSM(activeCriteria) {
    const totalWeight = activeCriteria.reduce((sum, key) => sum + state.weights[key], 0);
    const normWeights = {};
    activeCriteria.forEach(key => { normWeights[key] = state.weights[key] / totalWeight; });
    
    const normalized = {};
    activeCriteria.forEach(key => {
        const vals = state.bikes.map(b => b[key]);
        const lib = CRITERIA[key].lowerIsBetter;
        normalized[key] = normalize(vals, lib === true);
    });
    
    return state.bikes.map((bike, i) => {
        const breakdown = {};
        let total = 0;
        activeCriteria.forEach(key => {
            const contrib = normalized[key][i] * normWeights[key];
            breakdown[key] = { raw: bike[key], normalized: normalized[key][i], weight: normWeights[key], contribution: contrib };
            total += contrib;
        });
        return { bike, score: total * 100, breakdown };
    }).sort((a, b) => b.score - a.score);
}

function calculateTOPSIS(activeCriteria) {
    const totalWeight = activeCriteria.reduce((sum, key) => sum + state.weights[key], 0);
    const normWeights = {};
    activeCriteria.forEach(key => { normWeights[key] = state.weights[key] / totalWeight; });
    
    const normalized = {};
    activeCriteria.forEach(key => {
        const vals = state.bikes.map(b => b[key] || 0);
        const sqrtSum = Math.sqrt(vals.reduce((sum, v) => sum + v * v, 0));
        normalized[key] = vals.map(v => sqrtSum > 0 ? v / sqrtSum : 0);
    });
    
    const weighted = {};
    activeCriteria.forEach(key => { weighted[key] = normalized[key].map(v => v * normWeights[key]); });
    
    const idealBest = {}, idealWorst = {};
    activeCriteria.forEach(key => {
        const lib = CRITERIA[key].lowerIsBetter === true;
        idealBest[key] = lib ? Math.min(...weighted[key]) : Math.max(...weighted[key]);
        idealWorst[key] = lib ? Math.max(...weighted[key]) : Math.min(...weighted[key]);
    });
    
    return state.bikes.map((bike, i) => {
        let dBest = 0, dWorst = 0;
        const breakdown = {};
        activeCriteria.forEach(key => {
            const wv = weighted[key][i];
            dBest += Math.pow(wv - idealBest[key], 2);
            dWorst += Math.pow(wv - idealWorst[key], 2);
            breakdown[key] = { raw: bike[key], normalized: normalized[key][i], weight: normWeights[key], weighted: wv };
        });
        dBest = Math.sqrt(dBest);
        dWorst = Math.sqrt(dWorst);
        const score = dWorst / (dBest + dWorst) || 0;
        return { bike, score: score * 100, breakdown, dBest, dWorst };
    }).sort((a, b) => b.score - a.score);
}

function calculateVFM(activeCriteria) {
    const qualityCriteria = activeCriteria.filter(k => k !== 'price');
    if (qualityCriteria.length === 0 || !activeCriteria.includes('price')) {
        showNotification('VFM requires price and at least one other criterion', 'warning');
        return calculateWSM(activeCriteria);
    }
    
    const totalQW = qualityCriteria.reduce((sum, key) => sum + state.weights[key], 0);
    const qWeights = {};
    qualityCriteria.forEach(key => { qWeights[key] = state.weights[key] / totalQW; });
    
    const normalized = {};
    qualityCriteria.forEach(key => {
        const vals = state.bikes.map(b => b[key]);
        normalized[key] = normalize(vals, CRITERIA[key].lowerIsBetter === true);
    });
    
    return state.bikes.map((bike, i) => {
        let qScore = 0;
        const breakdown = {};
        qualityCriteria.forEach(key => {
            const contrib = normalized[key][i] * qWeights[key];
            breakdown[key] = { raw: bike[key], normalized: normalized[key][i], weight: qWeights[key], contribution: contrib };
            qScore += contrib;
        });
        const price = bike.price || 1;
        const vfm = (qScore / price) * 100000;
        breakdown.price = { raw: bike.price, normalized: 1 / price, vfm };
        return { bike, score: vfm, qualityScore: qScore * 100, breakdown };
    }).sort((a, b) => b.score - a.score);
}

// ===== Render Results =====
function renderResults(results, activeCriteria) {
    elements.resultsEmpty.style.display = 'none';
    elements.resultsActions.style.display = 'flex';
    
    document.querySelectorAll('.result-card').forEach(card => card.remove());
    
    results.forEach((result, index) => {
        const card = document.createElement('div');
        card.className = `result-card ${index === 0 ? 'winner' : ''}`;
        
        const scoreDisplay = result.score.toFixed(1);
        const isClose = index > 0 && results[0].score - result.score < 5;
        
        card.innerHTML = `
            <span class="result-rank">#${index + 1}</span>
            <div class="result-header">
                <span class="result-name">${escapeHtml(result.bike.name)}${index === 0 ? '<span class="winner-badge">🏆 Best Choice</span>' : ''}</span>
                <div class="result-score">
                    <span class="score-value">${scoreDisplay}</span>
                    <span class="score-label">${state.method === 'vfm' ? 'VFM Index' : 'Score'}</span>
                    ${isClose ? '<span class="score-close">Very close!</span>' : ''}
                </div>
            </div>
            <div class="result-breakdown-grid">
                ${activeCriteria.slice(0, 10).map(key => {
                    const data = result.breakdown[key];
                    return data ? `<div class="breakdown-item-compact"><span class="breakdown-label">${CRITERIA[key].icon}</span><span class="breakdown-value">${formatValue(data.raw, key)}</span></div>` : '';
                }).join('')}
            </div>
            <div class="math-breakdown ${state.showMath ? 'visible' : ''}" id="math-${result.bike.id}">
                <div class="math-breakdown-title">Calculation Breakdown</div>
                <table class="math-table">
                    <tr><th>Criteria</th><th>Raw</th><th>Normalized</th><th>Weight</th><th>Contribution</th></tr>
                    ${activeCriteria.map(key => {
                        const d = result.breakdown[key];
                        if (!d) return '';
                        return `<tr><td>${CRITERIA[key].name}</td><td>${formatValue(d.raw, key)}</td><td class="normalized">${(d.normalized * 100).toFixed(1)}%</td><td>${(d.weight * 100).toFixed(1)}%</td><td class="contribution">+${((d.contribution || d.weighted || 0) * 100).toFixed(2)}</td></tr>`;
                    }).join('')}
                </table>
            </div>
        `;
        
        elements.resultsContainer.appendChild(card);
    });
    
    updateResultsViews();
}

function toggleShowMath() {
    state.showMath = !state.showMath;
    document.getElementById('showMathBtn')?.classList.toggle('active', state.showMath);
    document.querySelectorAll('.math-breakdown').forEach(el => el.classList.toggle('visible', state.showMath));
}

function toggleRadarChart() {
    state.showRadar = !state.showRadar;
    document.getElementById('radarChartBtn')?.classList.toggle('active', state.showRadar);
    elements.radarChartContainer.style.display = state.showRadar ? 'block' : 'none';
    if (state.showRadar && state.lastResults) drawRadarChart();
}

function toggleComparisonTable() {
    state.showTable = !state.showTable;
    document.getElementById('compareTableBtn')?.classList.toggle('active', state.showTable);
    elements.comparisonTableContainer.style.display = state.showTable ? 'block' : 'none';
    if (state.showTable) drawComparisonTable();
}

function updateResultsViews() {
    if (state.showRadar && state.lastResults) drawRadarChart();
    if (state.showTable) drawComparisonTable();
}

function drawRadarChart() {
    const canvas = document.getElementById('radarChart');
    const ctx = canvas.getContext('2d');
    const results = state.lastResults?.slice(0, 4) || [];
    const criteria = state.lastActiveCriteria?.slice(0, 8) || [];
    
    if (results.length === 0 || criteria.length === 0) return;
    
    const w = canvas.width, h = canvas.height;
    const cx = w / 2, cy = h / 2;
    const r = Math.min(w, h) / 2 - 40;
    const n = criteria.length;
    
    ctx.clearRect(0, 0, w, h);
    
    // Draw grid
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    for (let level = 1; level <= 5; level++) {
        ctx.beginPath();
        for (let i = 0; i <= n; i++) {
            const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
            const x = cx + (r * level / 5) * Math.cos(angle);
            const y = cy + (r * level / 5) * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
    
    // Draw axes and labels
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        const x = cx + (r + 20) * Math.cos(angle);
        const y = cy + (r + 20) * Math.sin(angle);
        ctx.fillText(CRITERIA[criteria[i]]?.icon || '', x, y + 4);
    }
    
    // Draw data
    const colors = ['#00d4aa', '#ff6b35', '#f7c948', '#3b82f6'];
    results.forEach((result, ri) => {
        ctx.beginPath();
        ctx.strokeStyle = colors[ri % colors.length];
        ctx.fillStyle = colors[ri % colors.length] + '30';
        ctx.lineWidth = 2;
        
        for (let i = 0; i <= n; i++) {
            const key = criteria[i % n];
            const val = result.breakdown[key]?.normalized || 0;
            const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
            const x = cx + r * val * Math.cos(angle);
            const y = cy + r * val * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.fill();
        ctx.stroke();
    });
    
    // Legend
    ctx.textAlign = 'left';
    results.forEach((result, ri) => {
        ctx.fillStyle = colors[ri % colors.length];
        ctx.fillRect(10, 10 + ri * 16, 12, 12);
        ctx.fillStyle = '#fff';
        ctx.fillText(result.bike.name.substring(0, 20), 28, 20 + ri * 16);
    });
}

function drawComparisonTable() {
    if (!state.lastResults || !state.lastActiveCriteria) return;
    
    const table = document.getElementById('comparisonTable');
    const criteria = state.lastActiveCriteria;
    const bikes = state.lastResults.map(r => r.bike);
    
    // Find best/worst for each criterion
    const bestWorst = {};
    criteria.forEach(key => {
        const vals = bikes.map(b => b[key]).filter(v => v !== null);
        if (vals.length) {
            const lib = CRITERIA[key].lowerIsBetter === true;
            bestWorst[key] = { best: lib ? Math.min(...vals) : Math.max(...vals), worst: lib ? Math.max(...vals) : Math.min(...vals) };
        }
    });
    
    table.innerHTML = `
        <thead>
            <tr><th>Criteria</th>${bikes.map(b => `<th>${escapeHtml(b.name.substring(0, 15))}</th>`).join('')}</tr>
        </thead>
        <tbody>
            <tr><td><strong>Score</strong></td>${state.lastResults.map(r => `<td><strong>${r.score.toFixed(1)}</strong></td>`).join('')}</tr>
            ${criteria.map(key => `
                <tr>
                    <td>${CRITERIA[key].icon} ${CRITERIA[key].name}</td>
                    ${bikes.map(b => {
                        const val = b[key];
                        const bw = bestWorst[key];
                        let cls = '';
                        if (bw && val === bw.best) cls = 'best-value';
                        else if (bw && val === bw.worst) cls = 'worst-value';
                        return `<td class="${cls}">${formatValue(val, key)}</td>`;
                    }).join('')}
                </tr>
            `).join('')}
        </tbody>
    `;
}

function formatValue(value, criterion) {
    if (value === null || value === undefined) return '-';
    switch (criterion) {
        case 'price': return `$${value.toLocaleString()}`;
        case 'serviceCost': return `$${value}/yr`;
        case 'weight': return `${value}kg`;
        case 'engine': return `${value}cc`;
        case 'horsepower': return `${value}HP`;
        case 'torque': return `${value}Nm`;
        case 'topSpeed': return `${value}km/h`;
        case 'acceleration': return `${value}s`;
        case 'mileage': return `${value}km/l`;
        case 'seatHeight': return `${value}mm`;
        case 'fuelCapacity': return `${value}L`;
        default: return CRITERIA[criterion]?.unit === '/10' ? `${value}/10` : value.toString();
    }
}

function exportResults() {
    if (!state.lastResults) return;
    let csv = 'Rank,Motorcycle,Score,' + state.lastActiveCriteria.map(k => CRITERIA[k].name).join(',') + '\n';
    state.lastResults.forEach((r, i) => {
        const vals = state.lastActiveCriteria.map(k => r.breakdown[k]?.raw ?? '');
        csv += `${i + 1},"${r.bike.name}",${r.score.toFixed(2)},${vals.join(',')}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bikescore-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Results exported!');
}

// ===== AI Spec Extraction =====
let extractedBikeData = null;

function openAiModal() {
    elements.aiModal.classList.add('active');
    elements.aiInput.value = '';
    elements.aiPreview.style.display = 'none';
    document.getElementById('addExtractedBtn').style.display = 'none';
    extractedBikeData = null;
}

function closeAiModal() {
    elements.aiModal.classList.remove('active');
    extractedBikeData = null;
}

function extractSpecs() {
    const text = elements.aiInput.value.trim();
    if (!text) { showNotification('Please paste specifications first', 'warning'); return; }
    
    const btn = document.getElementById('extractBtn');
    btn.classList.add('loading');
    btn.textContent = 'Extracting...';
    
    setTimeout(() => {
        extractedBikeData = parseSpecsFromText(text);
        renderExtractedPreview();
        btn.classList.remove('loading');
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg> Extract Specs';
        if (extractedBikeData.name || Object.keys(extractedBikeData).length > 1) showNotification('Specs extracted!');
    }, 400);
}

function parseSpecsFromText(text) {
    const data = {};
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    
    // Name patterns
    const namePatterns = [
        /^((?:Honda|Yamaha|Kawasaki|Suzuki|KTM|Royal Enfield|Bajaj|TVS|Hero|Ducati|BMW|Harley|Triumph|Benelli|Aprilia)[^0-9]*(?:\d+[^\n]*)?)/i,
        /^([A-Z][a-z]+\s+[A-Z0-9][^\n]{5,50})/,
        /(?:Bike|Model)\s*Name?\s*[:\-]?\s*(.+)/i
    ];
    
    for (const line of lines.slice(0, 10)) {
        for (const p of namePatterns) {
            const m = line.match(p);
            if (m && m[1]?.length > 3 && m[1]?.length < 60) { data.name = m[1].trim(); break; }
        }
        if (data.name) break;
    }
    
    // Numeric patterns
    const patterns = {
        price: [/(?:Price|Ex-showroom|Cost)\s*[:\-]?\s*(?:Rs\.?|₹|INR)?\s*([\d,]+(?:\.\d+)?)\s*(?:Lakh|L|Lac)?/i, /\$([\d,]+)/],
        serviceCost: [/(?:Service\s*Cost|Maintenance)\s*[:\-]?\s*(?:Rs\.?|₹|\$)?\s*([\d,]+)/i],
        engine: [/(?:Displacement|Engine|CC)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:cc|CC)/i, /(\d{2,4})\s*cc/i],
        horsepower: [/(?:Max\.?\s*Power|Power|HP|PS|bhp)\s*[:\-]?\s*(\d+(?:\.\d+)?)/i],
        torque: [/(?:Max\.?\s*Torque|Torque)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:Nm|nm)/i],
        topSpeed: [/(?:Top\s*Speed|Max\s*Speed)\s*[:\-]?\s*(\d+)/i],
        acceleration: [/(?:0\s*[-–to]+\s*100)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:sec|s)/i],
        mileage: [/(?:Mileage|Fuel\s*Efficiency)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:km\/?l|kmpl)/i],
        weight: [/(?:Kerb\s*Weight|Weight)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:kg|Kg)/i],
        fuelCapacity: [/(?:Fuel\s*(?:Tank\s*)?Capacity|Tank)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:L|l|ltr)/i],
        seatHeight: [/(?:Seat\s*Height)\s*[:\-]?\s*(\d+)/i]
    };
    
    for (const [key, plist] of Object.entries(patterns)) {
        for (const p of plist) {
            const m = text.match(p);
            if (m?.[1]) {
                let val = parseFloat(m[1].replace(/,/g, ''));
                if (key === 'price' && /lakh|lac|l\b/i.test(m[0])) val *= 100000;
                if (key === 'price' && val < 1000) val *= 100000;
                data[key] = val;
                break;
            }
        }
    }
    
    // Rating specs
    const lower = text.toLowerCase();
    if (/dual\s*disc/i.test(text)) data.frontBrake = 10;
    else if (/disc/i.test(text)) data.frontBrake = 8;
    if (/rear.*disc/i.test(text)) data.rearBrake = 8;
    if (/dual\s*channel\s*abs/i.test(text)) data.abs = 10;
    else if (/abs/i.test(text)) data.abs = 7;
    if (/usd|upside\s*down|inverted/i.test(text)) data.frontSuspension = 9;
    else if (/telescopic/i.test(text)) data.frontSuspension = 7;
    if (/mono\s*shock/i.test(text)) data.rearSuspension = 8;
    if (lower.includes('led')) data.lighting = 8;
    if (lower.includes('tft')) data.instrumentation = 9;
    else if (lower.includes('digital')) data.instrumentation = 7;
    if (lower.includes('riding mode') || lower.includes('traction')) data.electronics = 9;
    else if (lower.includes('bluetooth')) data.electronics = 7;
    
    return data;
}

function renderExtractedPreview() {
    if (!extractedBikeData) return;
    
    const labels = { name: 'Name', price: 'Price', serviceCost: 'Service Cost', engine: 'Engine (cc)', horsepower: 'HP', torque: 'Torque', topSpeed: 'Top Speed', acceleration: '0-100', mileage: 'Mileage', weight: 'Weight', fuelCapacity: 'Fuel Tank', seatHeight: 'Seat Height', frontBrake: 'Front Brake', rearBrake: 'Rear Brake', abs: 'ABS', frontSuspension: 'Front Susp.', rearSuspension: 'Rear Susp.', lighting: 'Lighting', instrumentation: 'Console', electronics: 'Electronics' };
    const keys = Object.keys(labels);
    
    let html = '', count = 0;
    for (const key of keys) {
        const val = extractedBikeData[key];
        const has = val !== undefined && val !== null;
        if (has) count++;
        let display = '-';
        if (has) {
            if (key === 'price') display = val >= 100000 ? `₹${(val/100000).toFixed(2)} Lakh` : `$${val.toLocaleString()}`;
            else if (key === 'name') display = val;
            else if (['frontBrake','rearBrake','abs','frontSuspension','rearSuspension','lighting','instrumentation','electronics'].includes(key)) display = `${val}/10`;
            else display = val.toString();
        }
        html += `<div class="ai-preview-item ${has ? '' : 'missing'}"><span class="ai-preview-label">${labels[key]}</span><span class="ai-preview-value">${display}</span></div>`;
    }
    
    elements.aiPreviewGrid.innerHTML = html;
    elements.aiPreview.style.display = 'block';
    
    if (count > 0) document.getElementById('addExtractedBtn').style.display = 'flex';
    else showNotification('Could not extract specs. Try copying more content.', 'warning');
}

function addExtractedBike() {
    if (!extractedBikeData) return;
    if (!extractedBikeData.name) extractedBikeData.name = 'Imported Bike ' + (state.bikes.length + 1);
    
    const bikeData = { id: generateId(), ...extractedBikeData };
    state.bikes.push(bikeData);
    saveToStorage();
    closeAiModal();
    updateUI();
    showNotification(`${bikeData.name} added!`);
}

// ===== Utilities =====
function generateId() { return 'bike_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9); }
function escapeHtml(text) { const d = document.createElement('div'); d.textContent = text; return d.innerHTML; }

function showNotification(message, type = 'success') {
    const n = document.createElement('div');
    n.style.cssText = `position:fixed;top:20px;right:20px;padding:16px 24px;background:${type === 'warning' ? '#f7c948' : '#00d4aa'};color:${type === 'warning' ? '#1a1e28' : '#0a0c10'};border-radius:12px;font-weight:600;font-size:0.9rem;z-index:2000;animation:slideInRight 0.3s ease-out;box-shadow:0 10px 30px rgba(0,0,0,0.3);`;
    n.textContent = message;
    
    if (!document.getElementById('notificationStyles')) {
        const s = document.createElement('style');
        s.id = 'notificationStyles';
        s.textContent = '@keyframes slideInRight{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}';
        document.head.appendChild(s);
    }
    
    document.body.appendChild(n);
    setTimeout(() => { n.style.animation = 'slideInRight 0.3s ease-out reverse'; setTimeout(() => n.remove(), 300); }, 3000);
}

// ===== PWA =====
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(() => {});
    }
}
