/* ========================================================================
 * Application : VectisDHG Autonomie
 * Auteur : Paul NIETO
 * License : Usage strictement non commercial (Non-Commercial License)
 * ======================================================================== */

let epleIdentity = {
    name: "",
    uai: "",
    commune: "",
    enableSpecialites: false,
    enableOptionnels: false,
    enableCoEnseignement: false,
    enableMultiNiveau: false,
    enableMultiSite: false,
    sites: [],
    enablePonderations: false
};

let dotationGlobal = {
    hp: 0,
    hsa: 0
};

let currentActiveTabIndex = 0;
let currentAutonomieTabLevelIndex = 0;
let currentAutonomieTabDiscIndex = 0;
let currentAutonomieTabDisciplinesIndex = 0;
let settingsActiveTab = 'eple';

let optDeleteMode = false;
let optDisciplineManagementEnabled = false;
let optSortCol = 'name';
let optSortAsc = true;

let levels = ["6ème", "5ème", "4ème", "3ème", "2nde", "1ère", "Terminale"];
let autonomieMode = 'level';
let synthesisSortCol = 'disc';
let synthesisSortAsc = true;

const testDataset = {
    "epleIdentity": {
        "name": "Lycée Léonard de Vinci",
        "uai": "0421234A",
        "commune": "Saint-Étienne",
        "enableSpecialites": true,
        "enableOptionnels": true,
        "enableCoEnseignement": true,
        "enablePonderations": true
    },
    "dotation": {
        "hp": 900,
        "hsa": 45
    },
    "levels": [
        "6ème",
        "5ème",
        "4ème",
        "3ème",
        "2nde",
        "1ère",
        "Terminale"
    ],
    "baseHoursStore": {
        "6ème_Maths 6ème": 6,
        "5ème_Latin": 2,
        "4ème_Latin": 1
    },
    "coEnseignementGroups": [
        {
            "id": "test-group-1",
            "name": "Maths 5ème - co-intervention",
            "members": [
                {
                    "disc": "Mathématiques",
                    "sIndex": 2,
                    "teacher": "MARTIN Julien"
                },
                {
                    "disc": "Mathématiques",
                    "sIndex": 2,
                    "teacher": "BERNARD Sophie"
                }
            ]
        },
        {
            "id": "test-group-2",
            "name": "Projet interdisciplinaire Maths / HG",
            "members": [
                {
                    "disc": "Mathématiques",
                    "sIndex": 2,
                    "teacher": "MARTIN Julien"
                },
                {
                    "disc": "Histoire-Géographie",
                    "sIndex": 1,
                    "teacher": "RICHARD Paul"
                }
            ]
        }
    ],
    "dataStore": {
        "Mathématiques": {
            "deleteMode": false,
            "enableSpecialites": true,
            "enableOptionnels": false,
            "enableCoEnseignement": true,
            "sortCol": null,
            "sortAsc": true,
            "teachers": [
                "DUPONT Marie",
                "MARTIN Julien",
                "BERNARD Sophie"
            ],
            "apports": {
                "DUPONT Marie": 18,
                "MARTIN Julien": 15,
                "BERNARD Sophie": 18
            },
            "services": [
                {
                    "level": "6ème",
                    "levels": [
                        "6ème"
                    ],
                    "name": "Maths 6ème",
                    "classes": 4,
                    "hours": 4.5,
                    "ponderationActive": false,
                    "ponderationFactor": 1.1,
                    "isSpecialite": false,
                    "isOptionnel": false,
                    "isCoEnseignement": false,
                    "locked": false,
                    "allocations": {
                        "DUPONT Marie": 9,
                        "MARTIN Julien": 9
                    }
                },
                {
                    "level": "Terminale",
                    "levels": [
                        "Terminale"
                    ],
                    "name": "Maths Expertes Terminale",
                    "classes": 2,
                    "hours": 3,
                    "ponderationActive": true,
                    "ponderationFactor": 1.1,
                    "isSpecialite": true,
                    "isOptionnel": false,
                    "isCoEnseignement": false,
                    "locked": false,
                    "allocations": {
                        "DUPONT Marie": 6
                    }
                },
                {
                    "level": "5ème",
                    "levels": [
                        "5ème"
                    ],
                    "name": "Maths 5ème co-intervention",
                    "classes": 2,
                    "hours": 4,
                    "ponderationActive": false,
                    "ponderationFactor": 1.1,
                    "isSpecialite": false,
                    "isOptionnel": false,
                    "isCoEnseignement": true,
                    "locked": false,
                    "allocations": {
                        "MARTIN Julien": 4,
                        "BERNARD Sophie": 4
                    }
                },
                {
                    "level": "4ème",
                    "levels": [
                        "4ème"
                    ],
                    "name": "Maths 4ème",
                    "classes": 3,
                    "hours": 4,
                    "ponderationActive": false,
                    "ponderationFactor": 1.1,
                    "isSpecialite": false,
                    "isOptionnel": false,
                    "isCoEnseignement": false,
                    "locked": true,
                    "allocations": {
                        "DUPONT Marie": 12
                    }
                }
            ]
        },
        "Lettres modernes": {
            "deleteMode": false,
            "enableSpecialites": false,
            "enableOptionnels": true,
            "enableCoEnseignement": false,
            "sortCol": null,
            "sortAsc": true,
            "teachers": [
                "PETIT Claire",
                "ROBERT Antoine"
            ],
            "apports": {
                "PETIT Claire": 18,
                "ROBERT Antoine": 18
            },
            "services": [
                {
                    "level": "6ème",
                    "levels": [
                        "6ème"
                    ],
                    "name": "Français 6ème",
                    "classes": 4,
                    "hours": 4.5,
                    "ponderationActive": false,
                    "ponderationFactor": 1.1,
                    "isSpecialite": false,
                    "isOptionnel": false,
                    "isCoEnseignement": false,
                    "locked": false,
                    "allocations": {
                        "PETIT Claire": 9,
                        "ROBERT Antoine": 9
                    }
                },
                {
                    "level": "5ème",
                    "levels": [
                        "5ème",
                        "4ème",
                        "3ème"
                    ],
                    "name": "Latin",
                    "classes": 3,
                    "hours": 2,
                    "ponderationActive": false,
                    "ponderationFactor": 1.1,
                    "isSpecialite": false,
                    "isOptionnel": true,
                    "isCoEnseignement": false,
                    "locked": false,
                    "assignedDisciplines": [
                        "Lettres modernes"
                    ],
                    "assignedTeachers": [],
                    "optFinancedHours": 2,
                    "allocations": {
                        "PETIT Claire": 6
                    }
                }
            ]
        },
        "Histoire-Géographie": {
            "deleteMode": false,
            "enableSpecialites": false,
            "enableOptionnels": false,
            "enableCoEnseignement": true,
            "sortCol": null,
            "sortAsc": true,
            "teachers": [
                "RICHARD Paul",
                "DURAND Emma"
            ],
            "apports": {
                "RICHARD Paul": 18,
                "DURAND Emma": 18
            },
            "services": [
                {
                    "level": "6ème",
                    "levels": [
                        "6ème"
                    ],
                    "name": "HG 6ème",
                    "classes": 4,
                    "hours": 3,
                    "ponderationActive": false,
                    "ponderationFactor": 1.1,
                    "isSpecialite": false,
                    "isOptionnel": false,
                    "isCoEnseignement": false,
                    "locked": false,
                    "allocations": {
                        "RICHARD Paul": 8,
                        "DURAND Emma": 4
                    }
                },
                {
                    "level": "5ème",
                    "levels": [
                        "5ème"
                    ],
                    "name": "HG-EMC 5ème",
                    "classes": 1,
                    "hours": 2,
                    "ponderationActive": false,
                    "ponderationFactor": 1.1,
                    "isSpecialite": false,
                    "isOptionnel": false,
                    "isCoEnseignement": true,
                    "locked": false,
                    "allocations": {
                        "RICHARD Paul": 2,
                        "DURAND Emma": 2
                    }
                }
            ]
        },
        "Anglais": {
            "deleteMode": false,
            "enableSpecialites": false,
            "enableOptionnels": true,
            "enableCoEnseignement": false,
            "sortCol": null,
            "sortAsc": true,
            "teachers": [
                "MOREAU Lucas",
                "SIMON Camille"
            ],
            "apports": {
                "MOREAU Lucas": 18,
                "SIMON Camille": 18
            },
            "services": [
                {
                    "level": "6ème",
                    "levels": [
                        "6ème"
                    ],
                    "name": "Anglais 6ème",
                    "classes": 4,
                    "hours": 3,
                    "ponderationActive": false,
                    "ponderationFactor": 1.1,
                    "isSpecialite": false,
                    "isOptionnel": false,
                    "isCoEnseignement": false,
                    "locked": false,
                    "allocations": {
                        "MOREAU Lucas": 6,
                        "SIMON Camille": 6
                    }
                },
                {
                    "level": "2nde",
                    "levels": [
                        "2nde",
                        "1ère"
                    ],
                    "name": "Section Européenne Anglais",
                    "classes": 2,
                    "hours": 2,
                    "ponderationActive": true,
                    "ponderationFactor": 1.1,
                    "isSpecialite": false,
                    "isOptionnel": true,
                    "isCoEnseignement": false,
                    "locked": false,
                    "assignedDisciplines": [
                        "Anglais",
                        "Espagnol"
                    ],
                    "assignedTeachers": [],
                    "optFinancedHours": 1,
                    "allocations": {
                        "MOREAU Lucas": 4
                    }
                }
            ]
        },
        "Espagnol": {
            "deleteMode": false,
            "enableSpecialites": false,
            "enableOptionnels": true,
            "enableCoEnseignement": false,
            "sortCol": null,
            "sortAsc": true,
            "teachers": [
                "LAURENT Nina"
            ],
            "apports": {
                "LAURENT Nina": 18
            },
            "services": [
                {
                    "level": "5ème",
                    "levels": [
                        "5ème"
                    ],
                    "name": "Espagnol LV2 5ème",
                    "classes": 3,
                    "hours": 2.5,
                    "ponderationActive": false,
                    "ponderationFactor": 1.1,
                    "isSpecialite": false,
                    "isOptionnel": false,
                    "isCoEnseignement": false,
                    "locked": false,
                    "allocations": {
                        "LAURENT Nina": 7.5
                    }
                }
            ]
        }
    }
};

let dataStore = {
    "Mathématiques": {
        deleteMode: false,
        enableSpecialites: true,
        enableOptionnels: false,
        enableCoEnseignement: false,
        sortCol: null,
        sortAsc: true,
        teachers: ["DU PONT Pierre", "MARTIN Sophie"],
        apports: { "DU PONT Pierre": 18, "MARTIN Sophie": 18 },
        services: [
            { level: "6ème", levels: ["6ème"], name: "Maths 6è", classes: 4, hours: 4.5, ponderationActive: false, ponderationFactor: 1.1, isSpecialite: false, isOptionnel: false, isCoEnseignement: false, locked: false, allocations: { "DU PONT Pierre": 9, "MARTIN Sophie": 9 } },
            { level: "Terminale", levels: ["Terminale"], name: "Maths Tle", classes: 2, hours: 6.0, ponderationActive: true, ponderationFactor: 1.1, isSpecialite: true, isOptionnel: false, isCoEnseignement: false, locked: false, allocations: { "DU PONT Pierre": 6, "MARTIN Sophie": 6 } }
        ]
    },
    "Lettres modernes": {
        deleteMode: false,
        enableSpecialites: false,
        enableOptionnels: false,
        enableCoEnseignement: false,
        sortCol: null,
        sortAsc: true,
        teachers: ["BERNARD Julie"],
        apports: { "BERNARD Julie": 18 },
        services: [
            { level: "1ère", levels: ["1ère"], name: "Français 1ère", classes: 3, hours: 4.5, ponderationActive: true, ponderationFactor: 1.1, isSpecialite: false, isOptionnel: false, isCoEnseignement: false, locked: false, allocations: { "BERNARD Julie": 13.5 } }
        ]
    }
};

let baseHoursStore = {};
let coEnseignementGroups = [];
let n1Reference = { enabled: false, file: '', epleName: '', levels: [], names: {}, flags: {} };   // données de l'année N-1 (intitulés proposés)
let coordinators = [];   // [{ discs: [disc…], coords: [{ teacher, email }] }]

// Chargement différé de la librairie Excel (SheetJS) : elle ne pèse rien sur le
// chargement initial de la page et n'est téléchargée que lorsqu'un import ou un
// export Excel est réellement demandé (import Excel, TRMD, co-enseignement,
// export au format tableur).
let xlsxLoadPromise = null;
function ensureXlsxLoaded() {
    if (window.XLSX) return Promise.resolve();
    if (xlsxLoadPromise) return xlsxLoadPromise;

    xlsxLoadPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
        script.onload = () => resolve();
        script.onerror = () => {
            xlsxLoadPromise = null;
            reject(new Error("Impossible de charger la librairie Excel. Vérifiez votre connexion internet et réessayez."));
        };
        document.head.appendChild(script);
    });

    return xlsxLoadPromise;
}
let coEnsHideAssociatedRows = false;
let draggedTeacherIdx = null;
let draggedLevelIdx = null;

document.addEventListener("DOMContentLoaded", () => {
    renderApp();
    document.getElementById('excelFileInput').addEventListener('change', handleFileUpload);
    document.getElementById('jsonFileInput').addEventListener('change', handleJsonLoad);
    document.getElementById('deltaFileInput').addEventListener('change', handleDeltaFile);
    initFeedbackModal();
    initFileMenu();

    window.addEventListener('click', (e) => {
        if (!e.target.closest('.multi-select-box')) {
            document.querySelectorAll('.multi-select-dropdown').forEach(d => d.classList.remove('active'));
        }
    });
});

function toggleMultiSelectDropdown(btnEl) {
    const container = btnEl.closest('.multi-select-box');
    const dropdown = container.querySelector('.multi-select-dropdown');
    const isActive = dropdown.classList.contains('active');
    document.querySelectorAll('.multi-select-dropdown').forEach(d => d.classList.remove('active'));
    if (!isActive) {
        dropdown.classList.add('active');
    }
}

function toggleSpecialitesGlobal(enabled) {
    epleIdentity.enableSpecialites = enabled;
    renderApp();
}

function toggleOptionnelsGlobal(enabled) {
    epleIdentity.enableOptionnels = enabled;
    renderApp();
}

function toggleCoEnseignementGlobal(enabled) {
    epleIdentity.enableCoEnseignement = enabled;
    renderApp();
}

function toggleMultiSiteGlobal(enabled) {
    epleIdentity.enableMultiSite = enabled;
    if (enabled && (!Array.isArray(epleIdentity.sites) || epleIdentity.sites.length < 2)) setSiteCount(2, true);
    renderMultiSiteConfig();
    renderApp();
}

function setSiteCount(n, silent) {
    n = Math.max(2, Math.min(6, parseInt(n, 10) || 2));
    if (!Array.isArray(epleIdentity.sites)) epleIdentity.sites = [];
    while (epleIdentity.sites.length < n) {
        const i = epleIdentity.sites.length;
        epleIdentity.sites.push({ id: 's' + i, color: SITE_COLORS[i % SITE_COLORS.length], name: i === 0 ? 'Site principal' : (i === 1 ? 'Annexe' : 'Site ' + (i + 1)), short: i === 0 ? 'Princ.' : (i === 1 ? 'Annexe' : 'S' + (i + 1)) });
    }
    epleIdentity.sites.length = n;
    if (!silent) { renderMultiSiteConfig(); renderApp(); }
}

function setSiteField(i, field, value) {
    if (!epleIdentity.sites[i]) return;
    epleIdentity.sites[i][field] = field === 'short' ? value.trim().slice(0, 5) : value.trim();
    renderApp();
}

function renderMultiSiteConfig() {
    const box = document.getElementById('multiSiteConfig');
    if (!box) return;
    const esc = escapeStructureHtml;
    if (!epleIdentity.enableMultiSite) { box.innerHTML = ''; return; }
    const sites = epleIdentity.sites || [];
    box.innerHTML = `
        <div class="site-config">
            <label>Nombre de sites
                <input type="number" min="2" max="6" value="${sites.length}" style="width:70px;" onchange="setSiteCount(this.value)">
            </label>
            <table class="site-config-table">
                <thead><tr><th>Nom du site</th><th>Libellé court</th><th>Couleur</th></tr></thead>
                <tbody>${sites.map((st, i) => `<tr>
                    <td><input type="text" class="site-name-input" value="${esc(st.name)}" placeholder="Nom du site" onchange="setSiteField(${i}, 'name', this.value)"></td>
                    <td><input type="text" class="site-short-input" value="${esc((st.short||"").slice(0,5))}" maxlength="5" placeholder="Court" onchange="setSiteField(${i}, 'short', this.value)"></td>
                    <td><input type="color" value="${getSiteColor(st, i)}" style="width:44px; padding:0;" onchange="setSiteField(${i}, 'color', this.value)"></td>
                </tr>`).join('')}</tbody>
            </table>
        </div>`;
}

function toggleMultiNiveauGlobal(enabled) {
    epleIdentity.enableMultiNiveau = enabled;
    renderApp();
}

// Gestion des pondérations : désactivée, aucune pondération n'est calculée ni affichée
function pondEnabled() {
    return !!(epleIdentity && epleIdentity.enablePonderations);
}

function togglePonderationsGlobal(enabled) {
    epleIdentity.enablePonderations = enabled;
    renderApp();
}

// Libellé du total selon que les pondérations sont gérées ou non
function totalLabelSuffix() {
    return pondEnabled() ? 'pondérations et ARE compris' : 'ARE compris';
}

function toggleDisciplineSpecialite(disc, enabled) {
    if (dataStore[disc]) {
        dataStore[disc].enableSpecialites = enabled;
        renderApp();
    }
}

function toggleDisciplineOptionnel(disc, enabled) {
    if (dataStore[disc]) {
        dataStore[disc].enableOptionnels = enabled;
        renderApp();
    }
}

function toggleDisciplineCoEnseignement(disc, enabled) {
    if (dataStore[disc]) {
        dataStore[disc].enableCoEnseignement = enabled;
        renderApp();
    }
}

function toggleDisciplineMultiNiveau(disc, enabled) {
    if (dataStore[disc]) {
        dataStore[disc].enableMultiNiveau = enabled;
        renderApp();
    }
}

function hasAnySpecialite() {
    if (!epleIdentity.enableSpecialites) return false;
    return Object.keys(dataStore).some(disc => {
        return dataStore[disc].services.some(s => s.isSpecialite);
    });
}

function hasAnyOptionnel() {
    if (!epleIdentity.enableOptionnels) return false;
    return Object.keys(dataStore).some(disc => {
        return dataStore[disc].services.some(s => s.isOptionnel);
    });
}

function updateSpecialiteButtonVisibility() {
    const speRow = document.getElementById('menuEdition');
    const speBtn = document.getElementById('btnSpecialites');
    const optBtn = document.getElementById('btnOptionnels');
    const coEnsBtn = document.getElementById('btnCoEnseignement');
    const hintBtn = document.getElementById('btnEditionHint');

    // Les entrées apparaissent dès que l'option correspondante est activée dans les paramètres
    const showSpe = !!epleIdentity.enableSpecialites;
    const showOpt = !!epleIdentity.enableOptionnels;
    const showCoEns = !!epleIdentity.enableCoEnseignement;

    if (speRow) speRow.style.display = 'block';
    if (speBtn) speBtn.style.display = showSpe ? 'flex' : 'none';
    if (optBtn) optBtn.style.display = showOpt ? 'flex' : 'none';
    if (coEnsBtn) coEnsBtn.style.display = showCoEns ? 'flex' : 'none';
    if (hintBtn) hintBtn.style.display = (showOpt || showCoEns) ? 'none' : 'flex';
    const syntheseSiteBtn = document.getElementById('btnSyntheseSites');
    if (syntheseSiteBtn) syntheseSiteBtn.style.display = multiSiteActive() ? 'flex' : 'none';
    const siteBtn = document.getElementById('btnGestionSites');
    if (siteBtn) siteBtn.style.display = multiSiteActive() ? 'flex' : 'none';
    const spBtn = document.getElementById('btnServicesParticuliers');
    if (spBtn) spBtn.style.display = (showOpt || showCoEns) ? 'flex' : 'none';
}

// 🎓 MODALE SPÉCIALITÉS
function openSpecialiteModal() {
    renderSpecialiteContent();
    document.getElementById('specialiteModal').classList.add('active');
}

function closeSpecialiteModal() {
    document.getElementById('specialiteModal').classList.remove('active');
}

// Spécialités d'un niveau regroupées par matière (même intitulé, toutes disciplines confondues) :
// le nombre de groupes est la somme des classes saisies, les enseignants et disciplines sont réunis.
function getSpecialiteRows(lvl) {
    const byName = {};
    Object.keys(dataStore).forEach(disc => {
        dataStore[disc].services.filter(s => s.level === lvl && s.isSpecialite).forEach(s => {
            const name = (s.name || '').trim() || '(sans intitulé)';
            const key = name.toLowerCase();
            if (!byName[key]) byName[key] = { name, groups: 0, teachers: [], discs: [] };
            const g = byName[key];
            g.groups += parseFloat(s.classes) || 0;
            if (!g.discs.includes(disc)) g.discs.push(disc);
            dataStore[disc].teachers.forEach(t => {
                const h = parseFloat(s.allocations && s.allocations[t]) || 0;
                if (h > 0) g.teachers.push({ t, h, disc });
            });
        });
    });
    return Object.values(byName).sort((x, y) => x.name.localeCompare(y.name, 'fr'));
}

function renderSpecialiteContent() {
    const tabsContainer = document.getElementById('speTabsContainer');
    const contentsContainer = document.getElementById('speContentsContainer');

    tabsContainer.innerHTML = '';
    contentsContainer.innerHTML = '';

    const levelsWithSpe = levels.filter(lvl => {
        return Object.keys(dataStore).some(disc => {
            return dataStore[disc].services.some(s => s.level === lvl && s.isSpecialite);
        });
    });

    if (levelsWithSpe.length === 0) {
        contentsContainer.innerHTML = '<p class="empty-state">Aucune spécialité cochée pour le moment.</p>';
        return;
    }

    levelsWithSpe.forEach((lvl, idx) => {
        const btn = document.createElement('button');
        btn.className = `level-tab-btn ${idx === 0 ? 'active' : ''}`;
        btn.textContent = lvl;
        btn.onclick = () => switchSpeTab(idx);
        tabsContainer.appendChild(btn);

        const contentDiv = document.createElement('div');
        contentDiv.className = `tab-content ${idx === 0 ? 'active' : ''}`;
        contentDiv.id = `spe-tab-${idx}`;

        const esc = escapeStructureHtml;
        const fmtG = n => String(Math.round(n * 100) / 100).replace('.', ',');
        const speRows = getSpecialiteRows(lvl);
        let totalGroups = 0;
        const bodyHtml = speRows.map(g => {
            totalGroups += g.groups;
            const tHtml = g.teachers.length
                ? g.teachers.map(x => `<span class="spe-teacher-badge" title="${esc(x.disc)}">👤 ${esc(x.t)} (${x.h.toFixed(1)} h)</span>`).join('')
                : '<span style="font-size: 0.8rem; color: var(--text-muted); font-style: italic;">Aucun enseignant affecté</span>';
            return `<tr><td><strong>${esc(g.name)}</strong></td><td class="num">${fmtG(g.groups)}</td><td><div class="spe-teachers-list">${tHtml}</div></td></tr>`;
        }).join('');
        const levelSpeHtml = `
            <table class="spe-table">
                <thead><tr><th>Matière</th><th class="num">Nombre de groupes</th><th>Enseignants</th></tr></thead>
                <tbody>${bodyHtml}</tbody>
                <tfoot><tr><td>Total</td><td class="num">${fmtG(totalGroups)}</td><td></td></tr></tfoot>
            </table>
            <p class="spe-note">Une même matière partagée entre plusieurs enseignants (sans co-enseignement) doit être saisie en fractions de classe dans chaque service (par exemple 0,5 + 0,5 pour une classe répartie à parts égales), afin que le nombre de groupes ne soit pas compté deux fois.</p>`;

        contentDiv.innerHTML = levelSpeHtml;
        contentsContainer.appendChild(contentDiv);
    });
}

function switchSpeTab(activeIndex) {
    document.querySelectorAll('#speTabsContainer .level-tab-btn').forEach((btn, i) => btn.classList.toggle('active', i === activeIndex));
    document.querySelectorAll('#speContentsContainer .tab-content').forEach((content, i) => content.classList.toggle('active', i === activeIndex));
}

// 🤝 MODALE CO-ENSEIGNEMENT
function openCoEnseignementModal() {
    renderCoEnseignementContent();
    document.getElementById('coEnseignementModal').classList.add('active');
}

function closeCoEnseignementModal() {
    document.getElementById('coEnseignementModal').classList.remove('active');
}

// Renvoie une ligne par couple (service, enseignant) pour tous les services marqués Co-E.
// Une ligne reste sélectionnable même après avoir été associée, afin qu'un enseignant
// partageant un même service avec plusieurs collègues puisse être associé librement,
// autant de fois que nécessaire, sans dépendre du nombre de classes du service.
function getCoEnseignementTeacherRows() {
    const result = [];
    Object.keys(dataStore).forEach(disc => {
        dataStore[disc].services.forEach((s, sIndex) => {
            if (s.isCoEnseignement) {
                const teachers = dataStore[disc].teachers.filter(t => (parseFloat(s.allocations[t]) || 0) > 0);
                if (teachers.length === 0) {
                    result.push({ disc, sIndex, service: s, teacher: null });
                } else {
                    teachers.forEach(t => {
                        result.push({ disc, sIndex, service: s, teacher: t });
                    });
                }
            }
        });
    });
    return result;
}

function rowKey(disc, sIndex, teacher) {
    return `${disc}__${sIndex}__${teacher}`;
}

// Renvoie les enseignants avec lesquels un enseignant a été explicitement associé (fusionné)
// dans la fenêtre Gestion du co-enseignement. Tant qu'aucune association n'a été faite,
// aucun partenaire n'est renvoyé. Les partenaires peuvent provenir d'un autre service
// (deux lignes distinctes associées ensemble), pas uniquement du même service.
function getCoEnseignementPartnersForRow(disc, sIndex, teacher) {
    const partners = new Set();
    coEnseignementGroups.forEach(g => {
        const isMember = g.members.some(m => m.disc === disc && m.sIndex === sIndex && m.teacher === teacher);
        if (isMember) {
            g.members.forEach(m => {
                if (!(m.disc === disc && m.sIndex === sIndex && m.teacher === teacher)) {
                    partners.add(m.teacher);
                }
            });
        }
    });
    return Array.from(partners);
}

// Construit les colonnes (Niveau / Discipline / Enseignant) appariées ligne à ligne ;
// une discipline identique à la précédente (une fois les membres triés) n'est pas répétée.
function buildPairedDisciplineTeacherColumns(members) {
    const sorted = [...members].sort((a, b) => a.disc.localeCompare(b.disc, 'fr'));
    let prevDisc = null;
    let prevLevel = null;
    const levelLines = [];
    const discLines = [];
    const teacherLines = [];
    sorted.forEach(m => {
        const svc = dataStore[m.disc] && dataStore[m.disc].services[m.sIndex];
        const levelLabel = svc ? getServiceLevels(svc).join(', ') : '';
        if (levelLabel === prevLevel) {
            levelLines.push('&nbsp;');
        } else {
            levelLines.push(levelLabel);
            prevLevel = levelLabel;
        }
        if (m.disc === prevDisc) {
            discLines.push('&nbsp;');
        } else {
            discLines.push(m.disc);
            prevDisc = m.disc;
        }
        teacherLines.push(m.teacher || '—');
    });
    return {
        levelHtml: levelLines.join('<br>'),
        discHtml: discLines.join('<br>'),
        teacherHtml: teacherLines.join('<br>')
    };
}

function renderCoEnseignementContent() {
    const container = document.getElementById('coEnsContentContainer');
    const allRows = getCoEnseignementTeacherRows();

    if (allRows.length === 0) {
        container.innerHTML = '<p class="empty-state">Aucun service n\'est actuellement identifié comme en co-enseignement. Cochez la case « Co-E » dans les tableaux de disciplines concernées pour les faire apparaître ici.</p>';
        return;
    }

    // Nettoyage : ne conserver que les membres de groupe correspondant encore à un enseignant réellement affecté
    const validKeys = new Set(allRows.map(r => rowKey(r.disc, r.sIndex, r.teacher)));
    coEnseignementGroups.forEach(g => {
        g.members = g.members.filter(m => validKeys.has(rowKey(m.disc, m.sIndex, m.teacher)));
    });
    coEnseignementGroups = coEnseignementGroups.filter(g => g.members.length >= 2);

    // Nombre de groupes dans lesquels chaque ligne (service, enseignant) apparaît déjà
    const groupCountByKey = {};
    coEnseignementGroups.forEach(g => {
        g.members.forEach(m => {
            const key = rowKey(m.disc, m.sIndex, m.teacher);
            groupCountByKey[key] = (groupCountByKey[key] || 0) + 1;
        });
    });

    const visibleRows = coEnsHideAssociatedRows
        ? allRows.filter(item => !groupCountByKey[rowKey(item.disc, item.sIndex, item.teacher)])
        : allRows;

    let rowsHtml = '';

    coEnseignementGroups.forEach(group => {
        const paired = buildPairedDisciplineTeacherColumns(group.members);
        const nameValue = (group.name || '').replace(/"/g, '&quot;');

        rowsHtml += `
            <tr class="coens-group-row">
                <td></td>
                <td>
                    <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                        <input type="text" value="${nameValue}" style="min-width: 160px;" placeholder="Intitulé du co-enseignement" onchange="updateCoEnseignementGroupName('${group.id}', this.value)">
                        <span class="coens-fusionne-badge" style="font-size: 0.75rem; font-weight: 600; color: var(--amber-text); background: var(--amber-bg); border: 1px solid var(--amber-border); padding: 2px 6px; border-radius: 4px; white-space: nowrap;">🔗 Fusionné</span>
                        <button type="button" class="delete-btn-icon coens-dissociate-btn" title="Dissocier ce groupe" onclick="dissociateCoEnseignementGroup('${group.id}')">✕</button>
                    </div>
                </td>
                <td>${paired.levelHtml}</td>
                <td>${paired.discHtml}</td>
                <td>${paired.teacherHtml}</td>
            </tr>
        `;
    });

    if (visibleRows.length === 0) {
        rowsHtml += `
            <tr>
                <td colspan="5" style="text-align: center; color: var(--text-muted); font-style: italic; padding: 16px;">
                    Tous les services sont déjà associés et fusionnés. Désactivez le masquage pour les revoir.
                </td>
            </tr>
        `;
    }

    visibleRows.forEach(item => {
        const ref = { disc: item.disc, sIndex: item.sIndex, teacher: item.teacher };
        const refAttr = JSON.stringify(ref).replace(/"/g, '&quot;');
        const levelDisplay = getServiceLevels(item.service).join(', ');
        const groupCount = groupCountByKey[rowKey(item.disc, item.sIndex, item.teacher)] || 0;

        let teacherDisplay;
        if (!item.teacher) {
            teacherDisplay = '<span style="color: var(--text-muted); font-style: italic;">Aucun enseignant</span>';
        } else {
            teacherDisplay = `
                <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                    <span>${item.teacher}</span>
                    ${groupCount > 0 ? `<span style="font-size: 0.72rem; font-weight: 600; color: var(--amber-text); background: var(--amber-bg); border: 1px solid var(--amber-border); padding: 1px 5px; border-radius: 4px; white-space: nowrap;">déjà associé ×${groupCount}</span>` : ''}
                </div>
            `;
        }

        rowsHtml += `
            <tr>
                <td style="text-align: center;">
                    ${item.teacher ? `<input type="checkbox" class="coens-select-row" style="width: auto; cursor: pointer;" data-ref="${refAttr}">` : ''}
                </td>
                <td>${item.service.name || ''}</td>
                <td>${levelDisplay}</td>
                <td>${item.disc}</td>
                <td>${teacherDisplay}</td>
            </tr>
        `;
    });

    container.innerHTML = `
        <div class="action-bar" style="margin-bottom: 16px;">
            <button class="btn-secondary" onclick="associateCoEnseignementSelection()">🔗 Associer les enseignants sélectionnés</button>
            <button class="btn-secondary ${coEnsHideAssociatedRows ? 'active' : ''}" onclick="toggleCoEnsHideAssociatedRows()">
                ${coEnsHideAssociatedRows ? '👁️ Afficher tous les services' : '🗂️ Gérer les services (masquer les services déjà fusionnés)'}
            </button>
        </div>
        <p class="settings-tab-hint" style="margin-top: -8px;">Cochez au moins deux enseignants ci-dessous puis cliquez sur « Associer ». Un enseignant reste disponible après une association : vous pouvez le recocher autant de fois que nécessaire pour créer d'autres regroupements (par exemple s'il partage un même service avec plusieurs collègues).</p>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th style="width: 40px;"></th>
                        <th>Intitulé Service / Matière</th>
                        <th>Niveau</th>
                        <th>Discipline</th>
                        <th>Enseignant</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
        </div>
    `;
}

function toggleCoEnsHideAssociatedRows() {
    coEnsHideAssociatedRows = !coEnsHideAssociatedRows;
    renderCoEnseignementContent();
}

function associateCoEnseignementSelection() {
    const checked = Array.from(document.querySelectorAll('.coens-select-row:checked'));
    if (checked.length < 2) {
        alert("Sélectionnez au moins deux enseignants à associer.");
        return;
    }

    const members = checked.map(cb => {
        try {
            return JSON.parse(cb.dataset.ref);
        } catch (e) {
            return null;
        }
    }).filter(Boolean);

    if (members.length < 2) return;

    const firstService = dataStore[members[0].disc] && dataStore[members[0].disc].services[members[0].sIndex];
    const defaultName = (firstService && firstService.name) || '';

    coEnseignementGroups.push({
        id: `coens-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: defaultName,
        members: members
    });

    renderCoEnseignementContent();
}

function dissociateCoEnseignementGroup(groupId) {
    coEnseignementGroups = coEnseignementGroups.filter(g => g.id !== groupId);
    renderCoEnseignementContent();
}

function updateCoEnseignementGroupName(groupId, value) {
    const group = coEnseignementGroups.find(g => g.id === groupId);
    if (group) {
        group.name = value;
    }
}

// Pont d'impression : utilise le gestionnaire natif iOS (WKWebView) s'il est présent,
// sinon repli sur l'impression navigateur classique.
function triggerPrint() {
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.printHandler) {
        window.webkit.messageHandlers.printHandler.postMessage('print');
    } else {
        window.print();
    }
}

function printCoEnseignementContent() {
    triggerPrint();
}

async function exportCoEnseignementToExcel() {
    const allRows = getCoEnseignementTeacherRows();

    if (allRows.length === 0) {
        alert("Aucun service en co-enseignement à exporter.");
        return;
    }

    try {
        await ensureXlsxLoaded();
    } catch (err) {
        alert(err.message);
        return;
    }

    const validKeys = new Set(allRows.map(r => rowKey(r.disc, r.sIndex, r.teacher)));
    coEnseignementGroups.forEach(g => {
        g.members = g.members.filter(m => validKeys.has(rowKey(m.disc, m.sIndex, m.teacher)));
    });
    const validGroups = coEnseignementGroups.filter(g => g.members.length >= 2);

    const sheetData = [
        ['Intitulé Service / Matière', 'Niveau', 'Discipline', 'Enseignant']
    ];

    validGroups.forEach(group => {
        const sorted = [...group.members].sort((a, b) => a.disc.localeCompare(b.disc, 'fr'));
        sorted.forEach(m => {
            const svc = dataStore[m.disc] && dataStore[m.disc].services[m.sIndex];
            sheetData.push([
                group.name || '',
                svc ? getServiceLevels(svc).join(', ') : '',
                m.disc,
                m.teacher || ''
            ]);
        });
    });

    allRows.forEach(item => {
        sheetData.push([
            item.service.name || '',
            getServiceLevels(item.service).join(', '),
            item.disc,
            item.teacher || ''
        ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    ws['!cols'] = [
        { wch: 28 }, { wch: 12 }, { wch: 22 }, { wch: 30 }
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Co-enseignement');

    const epleLabel = epleIdentity && epleIdentity.name ? `_${sanitizeFileName(epleIdentity.name)}` : '';
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const dateStr = `${now.getFullYear()}_${pad(now.getMonth() + 1)}_${pad(now.getDate())}`;
    const epleName = ((epleIdentity && epleIdentity.name) || '').trim()
        .replace(/[\\/:*?"<>|]+/g, ' ').replace(/\s+/g, '_').replace(/^_+|_+$/g, '') || 'EPLE';
    XLSX.writeFile(wb, `Co-enseignement${epleLabel}_${dateStr}.xlsx`);
}

// 🎨 MODALE ENSEIGNEMENTS OPTIONNELS
function openOptionnelModal() {
    renderOptionnelContent();
    document.getElementById('optionnelModal').classList.add('active');
}

function closeOptionnelModal() {
    document.getElementById('optionnelModal').classList.remove('active');
}

function handleOptSort(colKey) {
    if (optSortCol === colKey) {
        optSortAsc = !optSortAsc;
    } else {
        optSortCol = colKey;
        optSortAsc = true;
    }
    renderOptionnelContent();
}

function addOptionnelService() {
    const disciplines = Object.keys(dataStore);
    if (disciplines.length === 0) {
        alert("Veuillez créer au moins une discipline avant d'ajouter une option.");
        return;
    }

    const anchorDisc = disciplines[0];
    dataStore[anchorDisc].services.push({
        level: '',
        levels: [],
        assignedDisciplines: [],
        assignedTeachers: [],
        name: '',
        classes: 0,
        hours: 0,
        ponderationActive: false,
        ponderationFactor: 1.1,
        isSpecialite: false,
        isOptionnel: true,
        isCoEnseignement: false,
        locked: false,
        optFinancedHours: 0,
        allocations: {}
    });
    renderApp();
    renderOptionnelContent();
}

function toggleOptDeleteMode() {
    optDeleteMode = !optDeleteMode;
    renderOptionnelContent();
}

function toggleOptDisciplineManagement() {
    optDisciplineManagementEnabled = !optDisciplineManagementEnabled;
    renderOptionnelContent();
}

function deleteOptionnelService(anchorDisc, sIndex) {
    if (confirm("Voulez-vous vraiment supprimer cet enseignement optionnel ?")) {
        dataStore[anchorDisc].services.splice(sIndex, 1);
        renderApp();
        renderOptionnelContent();
    }
}

function updateOptServiceProperty(anchorDisc, sIndex, key, value) {
    const service = dataStore[anchorDisc].services[sIndex];
    if (service) {
        service[key] = value;
        renderApp();
        renderOptionnelContent();
    }
}

function toggleOptLevelSelection(anchorDisc, sIndex, lvl) {
    const service = dataStore[anchorDisc].services[sIndex];
    if (!service.levels) service.levels = service.level ? [service.level] : [];

    const idx = service.levels.indexOf(lvl);
    if (idx > -1) {
        service.levels.splice(idx, 1);
    } else {
        service.levels.push(lvl);
    }
    service.level = service.levels.length > 0 ? service.levels[0] : '';
    renderApp();
    renderOptionnelContent();
}

function toggleOptDisciplineSelection(anchorDisc, sIndex, disc) {
    const service = dataStore[anchorDisc].services[sIndex];
    if (!service.assignedDisciplines) service.assignedDisciplines = [];

    const idx = service.assignedDisciplines.indexOf(disc);

    if (idx > -1) {
        // Décoche une discipline déjà rattachée à ce service précis.
        if (service.assignedDisciplines.length === 1) {
            alert("Au moins une discipline rattachée est requise.");
            return;
        }
        service.assignedDisciplines.splice(idx, 1);

        const validTeachers = new Set();
        service.assignedDisciplines.forEach(d => {
            if (dataStore[d]) dataStore[d].teachers.forEach(t => validTeachers.add(t));
        });
        if (service.assignedTeachers) {
            service.assignedTeachers = service.assignedTeachers.filter(t => validTeachers.has(t));
        }
        if (service.allocations) {
            Object.keys(service.allocations).forEach(t => {
                if (!validTeachers.has(t)) delete service.allocations[t];
            });
        }
    } else if (service.assignedDisciplines.length === 0) {
        // Toute première discipline choisie pour ce service : on ancre réellement le
        // service dans la discipline choisie (et non dans la discipline technique par
        // défaut), pour qu'il apparaisse uniquement là où il doit être.
        service.assignedDisciplines.push(disc);
        if (disc !== anchorDisc && dataStore[disc]) {
            const idxInAnchor = dataStore[anchorDisc].services.indexOf(service);
            if (idxInAnchor > -1) {
                dataStore[anchorDisc].services.splice(idxInAnchor, 1);
                dataStore[disc].services.push(service);
            }
        }
    } else if (dataStore[disc]) {
        // Le service est déjà rattaché à une (ou plusieurs) discipline(s) : on rattache
        // simplement cette discipline supplémentaire au même service. Il apparaîtra
        // alors aussi dans le tableau de cette discipline, avec un badge "lié à"
        // indiquant la ou les autre(s) discipline(s) concernée(s).
        service.assignedDisciplines.push(disc);
    }

    renderApp();
    renderOptionnelContent();
}

function toggleOptTeacherSelection(anchorDisc, sIndex, teacher) {
    const service = dataStore[anchorDisc].services[sIndex];
    if (!service.assignedTeachers) service.assignedTeachers = [];

    const idx = service.assignedTeachers.indexOf(teacher);
    if (idx > -1) {
        service.assignedTeachers.splice(idx, 1);
    } else {
        service.assignedTeachers.push(teacher);
    }
    renderApp();
    renderOptionnelContent();
}

function renderOptionnelContent() {
    const container = document.getElementById('optContentContainer');
    
    let optList = [];
    let grandTotalVol = 0;
    let grandTotalFinanced = 0;

    Object.keys(dataStore).forEach(disc => {
        dataStore[disc].services.forEach((s, sIndex) => {
            if (s.isOptionnel) {
                const vol = (s.classes || 0) * (s.hours || 0);
                const financed = s.optFinancedHours !== undefined ? parseFloat(s.optFinancedHours) : 0;
                grandTotalVol += vol;
                grandTotalFinanced += financed;

                if (!s.levels) s.levels = s.level ? [s.level] : [];
                if (!s.assignedDisciplines) s.assignedDisciplines = [disc];
                if (!s.assignedTeachers) s.assignedTeachers = [];

                optList.push({
                    anchorDisc: disc,
                    sIndex: sIndex,
                    service: s,
                    name: s.name || '',
                    levels: s.levels,
                    assignedDisciplines: s.assignedDisciplines,
                    assignedTeachers: s.assignedTeachers,
                    classes: s.classes || 0,
                    hours: s.hours || 0,
                    vol: vol,
                    financed: financed,
                    ponderationActive: s.ponderationActive || false,
                    ponderationFactor: s.ponderationFactor || 1.1
                });
            }
        });
    });

    const margeUtilisee = grandTotalVol - grandTotalFinanced;
    const margeBadgeClass = margeUtilisee >= 0 ? 'success' : 'danger';

    optList.sort((a, b) => {
        let valA = a[optSortCol];
        let valB = b[optSortCol];

        if (optSortCol === 'level') {
            valA = a.levels.join(' ');
            valB = b.levels.join(' ');
        } else if (optSortCol === 'disc') {
            valA = a.assignedDisciplines.join(' ');
            valB = b.assignedDisciplines.join(' ');
        } else if (optSortCol === 'teacher') {
            valA = a.assignedTeachers.join(' ');
            valB = b.assignedTeachers.join(' ');
        }

        if (typeof valA === 'string') {
            valA = valA.toLowerCase();
            valB = valB.toLowerCase();
        }

        if (valA < valB) return optSortAsc ? -1 : 1;
        if (valA > valB) return optSortAsc ? 1 : -1;
        return 0;
    });

    const allDisciplines = Object.keys(dataStore);

    let rowsHtml = '';
    optList.forEach(item => {
        const s = item.service;
        const disc = item.anchorDisc;
        const sIndex = item.sIndex;

        const deleteBtnHtml = optDeleteMode 
            ? `<button class="delete-btn-icon" title="Supprimer cet enseignement optionnel" onclick="deleteOptionnelService('${disc.replace(/'/g, "\\'")}', ${sIndex})">✕</button>` 
            : '';

        const levelsDisplay = item.levels.length > 0 ? item.levels.join(', ') : 'Choisir...';
        let levelDropdownHtml = `
            <div class="multi-select-box">
                <button type="button" class="multi-select-btn" onclick="toggleMultiSelectDropdown(this)">
                    <span>${levelsDisplay}</span>
                    <span style="font-size: 0.65rem; color: var(--text-muted);">▼</span>
                </button>
                <div class="multi-select-dropdown">
                    ${levels.map(l => `
                        <label class="multi-select-item">
                            <input type="checkbox" ${item.levels.includes(l) ? 'checked' : ''} onchange="toggleOptLevelSelection('${disc.replace(/'/g, "\\'")}', ${sIndex}, '${l.replace(/'/g, "\\'")}')">
                            ${l}
                        </label>
                    `).join('')}
                </div>
            </div>
        `;

        const linkedDiscs = item.assignedDisciplines || [];
        let discDropdownHtml;
        if (linkedDiscs.length === 0) {
            // Aucune discipline rattachée pour l'instant : on doit toujours pouvoir en choisir
            // une première, que le mode « gestion des disciplines » soit activé ou non.
            discDropdownHtml = `
                <select style="font-size: 0.85rem;" onchange="if(this.value) toggleOptDisciplineSelection('${disc.replace(/'/g, "\\'")}', ${sIndex}, this.value)">
                    <option value="">Choisir...</option>
                    ${allDisciplines.map(d => `<option value="${d.replace(/"/g, '&quot;')}">${d}</option>`).join('')}
                </select>
            `;
        } else if (optDisciplineManagementEnabled) {
            const availableToAdd = allDisciplines.filter(d => !linkedDiscs.includes(d));
            discDropdownHtml = `
                <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 4px;">
                    ${linkedDiscs.map(d => `
                        <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.78rem; font-weight: 600; color: var(--teal-text); background: var(--teal-bg); border: 1px solid var(--teal-border); padding: 2px 6px; border-radius: 4px; white-space: nowrap;">
                            ${d}
                            ${linkedDiscs.length > 1 ? `
                                <button type="button" title="Retirer cette discipline" onclick="toggleOptDisciplineSelection('${disc.replace(/'/g, "\\'")}', ${sIndex}, '${d.replace(/'/g, "\\'")}')" style="background: none; border: none; cursor: pointer; color: var(--teal-text); font-weight: 700; padding: 0; line-height: 1; font-size: 0.85rem;">✕</button>
                            ` : ''}
                        </span>
                    `).join('')}
                    ${availableToAdd.length > 0 ? `
                        <div class="multi-select-box" style="width: auto; display: inline-block;">
                            <button type="button" class="multi-select-btn" title="Rattacher une discipline supplémentaire" onclick="toggleMultiSelectDropdown(this)" style="width: 24px; height: 24px; padding: 0; justify-content: center; border-radius: 50%; font-weight: 700; font-size: 0.9rem;">+</button>
                            <div class="multi-select-dropdown" style="min-width: 160px; left: auto; right: 0;">
                                ${availableToAdd.map(d => `
                                    <div class="multi-select-item" onclick="toggleOptDisciplineSelection('${disc.replace(/'/g, "\\'")}', ${sIndex}, '${d.replace(/'/g, "\\'")}')">${d}</div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        } else {
            discDropdownHtml = `<span style="font-size: 0.85rem;">${linkedDiscs.join(', ')}</span>`;
        }

        rowsHtml += `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 6px;">
                        ${deleteBtnHtml}
                        <input type="text" value="${item.name}" onchange="updateOptServiceProperty('${disc.replace(/'/g, "\\'")}', ${sIndex}, 'name', this.value)">
                    </div>
                </td>
                <td style="width: 140px;">${levelDropdownHtml}</td>
                <td style="width: 160px;">${discDropdownHtml}</td>
                <td style="width: 80px;">
                    <input type="number" min="0" step="0.5" value="${item.classes}" oninput="updateOptServiceProperty('${disc.replace(/'/g, "\\'")}', ${sIndex}, 'classes', parseFloat(this.value)||0)">
                </td>
                <td style="width: 80px;">
                    <input type="number" min="0" step="0.5" value="${item.hours}" oninput="updateOptServiceProperty('${disc.replace(/'/g, "\\'")}', ${sIndex}, 'hours', parseFloat(this.value)||0)">
                </td>
                ${pondEnabled() ? `                <td style="text-align: center; width: 120px;">
                    <div class="checkbox-container">
                        <input type="checkbox" ${item.ponderationActive ? 'checked' : ''} onchange="updateOptServiceProperty('${disc.replace(/'/g, "\\'")}', ${sIndex}, 'ponderationActive', this.checked)">
                        <input type="number" step="0.05" min="1" value="${item.ponderationFactor}" style="width: 55px;" ${!item.ponderationActive ? 'disabled' : ''} onchange="updateOptServiceProperty('${disc.replace(/'/g, "\\'")}', ${sIndex}, 'ponderationFactor', parseFloat(this.value)||1)">
                    </div>
                </td>
` : ''}
                <td style="text-align: center; font-weight: 700;">${item.vol.toFixed(1)} h</td>
                <td style="text-align: center; width: 140px;">
                    <input type="number" min="0" step="0.5" value="${item.financed}" style="width: 90px; text-align: center; font-weight: 600;" oninput="updateOptServiceProperty('${disc.replace(/'/g, "\\'")}', ${sIndex}, 'optFinancedHours', parseFloat(this.value)||0)">
                </td>
            </tr>
        `;
    });

    const makeHeader = (key, label) => {
        const isSorted = optSortCol === key;
        const icon = isSorted ? (optSortAsc ? '▲' : '▼') : '↕';
        const sortedClass = isSorted ? 'sorted' : '';
        return `
            <th class="sortable ${sortedClass}" onclick="handleOptSort('${key}')">
                ${label} <span class="sort-icon">${icon}</span>
            </th>
        `;
    };

    container.innerHTML = `
        <div class="action-bar" style="margin-bottom: 16px;">
            <button class="btn-secondary" onclick="addOptionnelService()">➕ Ajouter un service</button>
            <button class="disc-opt-toggle-box ${optDisciplineManagementEnabled ? 'active-mode' : ''}" onclick="toggleOptDisciplineManagement()">
                🔗 ${optDisciplineManagementEnabled ? 'Désactiver' : 'Activer'} la gestion des disciplines
            </button>
            <button class="btn-danger-mode ${optDeleteMode ? 'active' : ''}" onclick="toggleOptDeleteMode()">
                ${optDeleteMode ? '✖ Masquer la suppression' : '🗑️ Suppression'}
            </button>
        </div>

        <div class="dotation-panel" style="margin-bottom: 16px;">
            <div class="dotation-summary-item" style="font-size: 1rem; padding: 10px 16px;">
                <strong>Marge utilisée :</strong> 
                <span class="badge ${margeBadgeClass}" style="margin-left: 6px; font-size: 0.95rem;">
                    ${margeUtilisee > 0 ? '+' : ''}${margeUtilisee.toFixed(1)} h
                </span>
            </div>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        ${makeHeader('name', 'Intitulé Service / Matière')}
                        ${makeHeader('level', 'Niveau')}
                        ${makeHeader('disc', 'Discipline rattachée')}
                        ${makeHeader('classes', 'Nbr. Classe')}
                        ${makeHeader('hours', 'Vol. Classe')}
                        ${pondEnabled() ? '<th>Pondération</th>' : ''}
                        ${makeHeader('vol', 'Total')}
                        ${makeHeader('financed', 'Vol. horaire financé par la dotation')}
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
                <tfoot>
                    <tr class="totals-row grand-total">
                        <td colspan="${pondEnabled() ? 6 : 5}" style="text-align: right;">Total des enseignements optionnels :</td>
                        <td style="text-align: center; font-size: 0.95rem; color: var(--primary);"><strong>${grandTotalVol.toFixed(1)} h</strong></td>
                        <td style="text-align: center; font-size: 0.95rem; color: var(--teal-text);"><strong>${grandTotalFinanced.toFixed(1)} h</strong></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    `;
}

// 💬 GESTION DE LA MODALE DE RETOUR / AVIS (Web3Forms)
function initFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    const openBtn = document.getElementById('openFeedbackBtn');
    const closeBtn = document.getElementById('closeFeedbackBtn');
    const form = document.getElementById('feedbackForm');
    const status = document.getElementById('feedbackStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (!openBtn || !modal) return;

    openBtn.addEventListener('click', () => modal.classList.add('active'));
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    window.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';
        status.style.display = 'none';

        const formData = new FormData(form);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                status.style.color = 'var(--success)';
                status.textContent = 'Merci ! Votre message a bien été envoyé.';
                status.style.display = 'block';
                form.reset();
                setTimeout(() => {
                    modal.classList.remove('active');
                    status.style.display = 'none';
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Envoyer';
                }, 2000);
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            status.style.color = 'var(--danger)';
            status.textContent = "Erreur lors de l'envoi. Veuillez réessayer.";
            status.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Envoyer';
        }
    });
}

function autoAdjustLevelSelect(selectEl) {
    if (!selectEl) return;
    const selectedText = selectEl.options[selectEl.selectedIndex] ? selectEl.options[selectEl.selectedIndex].text : '';
    const charCount = Math.max(selectedText.length, 3);
    selectEl.style.width = `calc(${charCount}ch + 32px)`;
}

function openHelpModal() {
    document.getElementById('helpModal').classList.add('active');
}

function closeHelpModal() {
    document.getElementById('helpModal').classList.remove('active');
}

function updateAppTitle() {
    const mainTitleEl = document.getElementById('appMainTitle');
    const hasName = epleIdentity && epleIdentity.name && epleIdentity.name.trim() !== '';
    if (hasName) {
        mainTitleEl.textContent = `VectisDHG Autonomie - ${epleIdentity.name}`;
    } else {
        mainTitleEl.textContent = "VectisDHG Autonomie";
    }
    // Titre de l'onglet du navigateur
    document.title = hasName ? `Ventilation DHG ${epleIdentity.name.trim()}` : 'Ventilation DHG';
}

async function searchEpleOpenData() {
    const input = document.getElementById('epleSearchInput');
    const query = input.value.trim();
    const resultsContainer = document.getElementById('epleSearchResults');

    if (!query) {
        alert("Veuillez saisir un nom d'établissement, une ville ou un code UAI.");
        return;
    }

    resultsContainer.style.display = 'block';
    resultsContainer.innerHTML = '<div style="padding: 12px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">Recherche en cours dans l\'annuaire Open Data...</div>';

    try {
        const url = `https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records?where=search(nom_etablissement%2C%20"${encodeURIComponent(query)}")%20OR%20search(nom_commune%2C%20"${encodeURIComponent(query)}")%20OR%20identifiant_de_l_etablissement%3D"${encodeURIComponent(query)}"&limit=15`;
        const response = await fetch(url);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            resultsContainer.innerHTML = '<div style="padding: 12px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">Aucun établissement trouvé. Vérifiez l\'orthographe ou essayez le nom de la commune.</div>';
            return;
        }

        let html = '';
        data.results.forEach(item => {
            const name = item.nom_etablissement || "Établissement";
            const commune = item.nom_commune || "";
            const uai = item.identifiant_de_l_etablissement || "";
            const type = item.type_etablissement || "EPLE";

            html += `
                <div class="eple-result-item" onclick="selectEple('${name.replace(/'/g, "\\'")}', '${commune.replace(/'/g, "\\'")}', '${uai}')">
                    <div class="eple-result-title">${name}</div>
                    <div class="eple-result-sub">${type} • ${commune} (${uai})</div>
                </div>
            `;
        });

        resultsContainer.innerHTML = html;
    } catch (err) {
        resultsContainer.innerHTML = '<div style="padding: 12px; text-align: center; color: var(--danger); font-size: 0.85rem;">Erreur de connexion à l\'API Open Data. Vérifiez votre connexion Internet.</div>';
    }
}

function selectEple(name, commune, uai) {
    epleIdentity.name = name;
    epleIdentity.commune = commune;
    epleIdentity.uai = uai;
    document.getElementById('epleSearchResults').style.display = 'none';
    document.getElementById('epleSearchInput').value = '';
    renderEpleSelectedCard();
    updateAppTitle();
}

function clearEpleSelection() {
    epleIdentity.name = "";
    epleIdentity.commune = "";
    epleIdentity.uai = "";
    renderEpleSelectedCard();
    updateAppTitle();
}

function renderEpleSelectedCard() {
    const container = document.getElementById('selectedEpleContainer');
    if (epleIdentity && epleIdentity.name) {
        container.innerHTML = `
            <div class="eple-selected-card">
                <div>
                    <div style="font-size: 0.75rem; color: var(--success); font-weight: 700; text-transform: uppercase;">Établissement sélectionné :</div>
                    <div style="font-weight: 700; font-size: 1rem; color: var(--text);">${epleIdentity.name}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">${epleIdentity.commune} (${epleIdentity.uai})</div>
                </div>
                <button class="delete-btn-icon" title="Effacer l'établissement" onclick="clearEpleSelection()">✕</button>
            </div>
        `;
    } else {
        container.innerHTML = '';
    }

    const toggleInput = document.getElementById('toggleSpecialitesInput');
    if (toggleInput) {
        toggleInput.checked = epleIdentity.enableSpecialites || false;
    }

    const toggleOptInput = document.getElementById('toggleOptionnelsInput');
    if (toggleOptInput) {
        toggleOptInput.checked = epleIdentity.enableOptionnels || false;
    }

    const toggleCoEnsInput = document.getElementById('toggleCoEnseignementInput');
    if (toggleCoEnsInput) {
        toggleCoEnsInput.checked = epleIdentity.enableCoEnseignement || false;
    }

    const toggleMultiNiveauInput = document.getElementById('toggleMultiNiveauInput');
    if (toggleMultiNiveauInput) {
        toggleMultiNiveauInput.checked = epleIdentity.enableMultiNiveau || false;
    }

    const toggleMultiSiteInput = document.getElementById('toggleMultiSiteInput');
    if (toggleMultiSiteInput) toggleMultiSiteInput.checked = !!epleIdentity.enableMultiSite;
    renderMultiSiteConfig();

    const togglePondInput = document.getElementById('togglePonderationsInput');
    if (togglePondInput) {
        togglePondInput.checked = pondEnabled();
    }
}

function moveDiscipline(index, direction, event) {
    event.stopPropagation();
    const keys = Object.keys(dataStore);
    const targetIndex = index + direction;

    if (targetIndex < 0 || targetIndex >= keys.length) return;

    const entries = Object.entries(dataStore);
    const temp = entries[index];
    entries[index] = entries[targetIndex];
    entries[targetIndex] = temp;

    dataStore = Object.fromEntries(entries);

    if (currentActiveTabIndex === index) {
        currentActiveTabIndex = targetIndex;
    } else if (currentActiveTabIndex === targetIndex) {
        currentActiveTabIndex = index;
    }

    renderApp();
}

function openAutonomieModal() {
    renderAutonomieContent();
    document.getElementById('autonomieModal').classList.add('active');
}

function closeAutonomieModal() {
    document.getElementById('autonomieModal').classList.remove('active');
}

function switchAutonomieMode(mode) {
    autonomieMode = mode;
    document.getElementById('btnModeLevel').classList.toggle('active', mode === 'level');
    document.getElementById('btnModeDisc').classList.toggle('active', mode === 'disc');
    document.getElementById('btnModeDisciplines').classList.toggle('active', mode === 'disciplines');
    document.getElementById('btnModeSynthese').classList.toggle('active', mode === 'synthese');
    renderAutonomieContent();
}

function getBaseHourKey(level, serviceName) {
    return `${level}_${serviceName}`;
}

// Un service est-il associé au niveau donné ? (gère les services optionnels multi-niveaux)
function serviceMatchesLevel(s, lvl) {
    // Hors option multi-niveau, le niveau du service est son champ « level » (corrige d'anciennes sauvegardes)
    if (!s.isOptionnel && s.level) return s.level === lvl;
    if (Array.isArray(s.levels) && s.levels.length > 0) {
        return s.levels.includes(lvl);
    }
    return s.level === lvl;
}

// Renvoie la liste des niveaux d'un service (gère les services optionnels multi-niveaux)
function getServiceLevels(s) {
    if (!s.isOptionnel && s.level) return [s.level];
    if (Array.isArray(s.levels) && s.levels.length > 0) {
        return s.levels;
    }
    return s.level ? [s.level] : ['Non défini'];
}

// Badge indiquant que le service est également proposé à d'autres niveaux
function buildLinkedLevelsBadgeHtml(otherLevels) {
    if (!otherLevels || otherLevels.length === 0) return '';
    return `<span class="linked-level-badge">🔗 ${otherLevels.join(', ')}</span>`;
}

// Badge indiquant qu'un service est une spécialité
function buildSpeBadgeHtml() {
    return `<span class="spe-inline-badge">Spé</span>`;
}

// Badge indiquant qu'un service est un enseignement optionnel
function buildOptBadgeHtml() {
    return `<span class="opt-inline-badge">Option</span>`;
}

// Badge indiquant qu'un service est identifié comme en co-enseignement
function buildCoEnsBadgeHtml() {
    return `<span class="coens-inline-badge">Co-E</span>`;
}

// Une pastille distincte par collègue associé (plutôt qu'une seule pastille listant plusieurs noms)
function buildCoEnsPartnerBadgesHtml(partners) {
    if (!partners || partners.length === 0) return '';
    return partners.map(p => `<span class="coens-inline-badge" title="Co-enseignement avec ${p}">Co-E : ${p}</span>`).join('');
}

// Calcule l'autonomie (jamais négative à l'affichage) et le badge/icône d'information associés
function computeAutonomieCell(classes, hours, baseHourNum) {
    const raw = classes * (hours - baseHourNum);
    const clamped = Math.max(0, raw);
    const isFloorExceeded = raw < 0;
    const badgeClass = isFloorExceeded ? 'danger' : 'success';
    const infoHtml = isFloorExceeded
        ? `<span class="info-icon-badge" title="L'horaire plancher est supérieur au volume horaire attribué" tabindex="0">ⓘ</span>`
        : '';
    return {
        raw,
        clamped,
        html: `<span class="badge autonomie-badge ${badgeClass}">${clamped > 0 ? '+' : ''}${clamped.toFixed(1)} h</span>${infoHtml}`
    };
}

function updateBaseHour(level, serviceName, inputEl) {
    const key = getBaseHourKey(level, serviceName);
    const val = parseFloat(inputEl.value) || 0;
    baseHoursStore[key] = val;

    const row = inputEl.closest('tr');
    if (row) {
        const volHours = parseFloat(row.dataset.volhours) || 0;
        const classes = parseFloat(row.dataset.classes) || 0;

        const cell = computeAutonomieCell(classes, volHours, val);
        const autonomieCellContainer = row.querySelector('.autonomie-cell');
        if (autonomieCellContainer) {
            autonomieCellContainer.innerHTML = cell.html;
        }

        const table = row.closest('table');
        if (table) {
            let totalAutonomie = 0;
            table.querySelectorAll('tbody tr').forEach(r => {
                const rInput = r.querySelector('input[type="number"]');
                const rVal = parseFloat(rInput ? rInput.value : 0) || 0;
                const rVolHours = parseFloat(r.dataset.volhours) || 0;
                const rClasses = parseFloat(r.dataset.classes) || 0;
                totalAutonomie += Math.max(0, rClasses * (rVolHours - rVal));
            });

            const grandBadge = table.querySelector('.grand-total-badge');
            if (grandBadge) {
                grandBadge.className = `badge grand-total-badge ${totalAutonomie >= 0 ? 'success' : 'danger'}`;
                grandBadge.textContent = `${totalAutonomie > 0 ? '+' : ''}${totalAutonomie.toFixed(1)} h`;
            }
        }
    }
}

// Un service positionné sur plusieurs niveaux n'a qu'une seule case Horaire plancher dans le
// tableau de discipline (l'horaire plancher est associé au service). Cette valeur unique
// alimente cependant toutes les cases correspondantes dans Autonomie EPLE, pour chacun des
// niveaux concernés par ce service.
function updateServiceBaseHourAllLevels(disc, sIndex, value) {
    const service = dataStore[disc] && dataStore[disc].services[sIndex];
    if (!service) return;

    const val = parseFloat(value) || 0;
    const svcLevels = getServiceLevels(service);
    svcLevels.forEach(lvl => {
        const key = getBaseHourKey(lvl, service.name || '');
        baseHoursStore[key] = val;
    });
}

function getAllUniqueServiceNames() {
    const namesSet = new Set();
    Object.keys(dataStore).forEach(disc => {
        dataStore[disc].services.forEach(s => {
            if (s.name && s.name.trim() !== '') {
                namesSet.add(s.name.trim());
            }
        });
    });
    return Array.from(namesSet).sort();
}

function renderAutonomieContent() {
    const tabsContainer = document.getElementById('autonomieTabsContainer');
    const contentsContainer = document.getElementById('autonomieContentsContainer');

    tabsContainer.innerHTML = '';
    contentsContainer.innerHTML = '';

    const uniqueServiceNames = getAllUniqueServiceNames();
    const disciplines = Object.keys(dataStore);

    if (autonomieMode === 'level') {
        if (levels.length === 0) {
            contentsContainer.innerHTML = '<p class="empty-state">Aucun niveau configuré.</p>';
            return;
        }

        if (currentAutonomieTabLevelIndex >= levels.length) {
            currentAutonomieTabLevelIndex = 0;
        }

        levels.forEach((lvl, idx) => {
            const isActive = idx === currentAutonomieTabLevelIndex;
            const btn = document.createElement('button');
            btn.className = `level-tab-btn ${isActive ? 'active' : ''}`;
            btn.textContent = lvl;
            btn.onclick = () => switchAutonomieTab(idx);
            tabsContainer.appendChild(btn);

            const contentDiv = document.createElement('div');
            contentDiv.className = `tab-content ${isActive ? 'active' : ''}`;
            contentDiv.id = `autonomie-tab-${idx}`;

            const servicesByIntitule = {};

            Object.keys(dataStore).forEach(disc => {
                dataStore[disc].services.forEach(s => {
                    if (serviceMatchesLevel(s, lvl) && s.name && s.name.trim() !== '') {
                        const intitule = s.name.trim();
                        if (!servicesByIntitule[intitule]) {
                            servicesByIntitule[intitule] = { classes: 0, hours: 0, otherLevels: new Set(), isCoEns: false, isOpt: false };
                        }
                        servicesByIntitule[intitule].classes += (s.classes || 0);
                        servicesByIntitule[intitule].hours = (s.hours || 0);
                        if (s.isCoEnseignement) {
                            servicesByIntitule[intitule].isCoEns = true;
                        }
                        if (s.isOptionnel) servicesByIntitule[intitule].isOpt = true;
                        if (Array.isArray(s.levels) && s.levels.length > 1) {
                            s.levels.filter(l => l !== lvl).forEach(l => servicesByIntitule[intitule].otherLevels.add(l));
                        }
                    }
                });
            });

            const intitulesList = Object.keys(servicesByIntitule).sort();

            if (intitulesList.length === 0) {
                contentDiv.innerHTML = `<p class="empty-state">Aucun service défini pour le niveau <strong>${lvl}</strong>.</p>`;
            } else {
                let tableHtml = `
                    <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Intitulé Service / Matière</th>
                                <th style="text-align: center; width: 140px;">Horaire plancher (h)</th>
                                <th style="text-align: center;">Volume classe (h)</th>
                                <th style="text-align: center;">Nombre de classes</th>
                                <th style="text-align: center;">Autonomie (h)</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                let grandTotalAutonomie = 0;

                intitulesList.forEach(intitule => {
                    const serviceData = servicesByIntitule[intitule];
                    const key = getBaseHourKey(lvl, intitule);
                    const baseHourVal = baseHoursStore[key] !== undefined ? baseHoursStore[key] : '';
                    const baseHourNum = parseFloat(baseHourVal) || 0;

                    const cell = computeAutonomieCell(serviceData.classes, serviceData.hours, baseHourNum);
                    grandTotalAutonomie += cell.clamped;

                    const linkedBadge = buildLinkedLevelsBadgeHtml(Array.from(serviceData.otherLevels));
                    const classesDisplay = serviceData.isCoEns
                        ? `${(serviceData.classes / 2)} ${buildCoEnsBadgeHtml()}`
                        : `${serviceData.classes}`;

                    tableHtml += `
                        <tr data-volhours="${serviceData.hours}" data-classes="${serviceData.classes}">
                            <td>
                                <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                                    <strong>${intitule}</strong>
                                    ${linkedBadge}
                                    ${serviceData.isOpt ? buildOptBadgeHtml() : ''}
                                </div>
                            </td>
                            <td style="text-align: center;">
                                <input type="number" min="0" step="0.5" value="${baseHourVal}" 
                                    placeholder="0" oninput="updateBaseHour('${lvl}', '${intitule.replace(/'/g, "\\'")}', this)">
                            </td>
                            <td style="text-align: center;">${serviceData.hours.toFixed(1)} h</td>
                            <td style="text-align: center;">
                                <div style="display: flex; align-items: center; justify-content: center; gap: 6px; flex-wrap: wrap;">
                                    ${classesDisplay}
                                </div>
                            </td>
                            <td style="text-align: center;" class="autonomie-cell">
                                ${cell.html}
                            </td>
                        </tr>
                    `;
                });

                const grandBadgeClass = grandTotalAutonomie >= 0 ? 'success' : 'danger';
                tableHtml += `
                    </tbody>
                    <tfoot>
                        <tr class="totals-row grand-total">
                            <td colspan="4" style="text-align: right;">Total Autonomie pour ${lvl} :</td>
                            <td style="text-align: center;">
                                <span class="badge grand-total-badge ${grandBadgeClass}">${grandTotalAutonomie > 0 ? '+' : ''}${grandTotalAutonomie.toFixed(1)} h</span>
                            </td>
                        </tr>
                    </tfoot>
                    </table>
                    </div>
                `;

                contentDiv.innerHTML = tableHtml;
            }

            contentsContainer.appendChild(contentDiv);
        });

    } else if (autonomieMode === 'disc') {
        if (uniqueServiceNames.length === 0) {
            contentsContainer.innerHTML = '<p class="empty-state">Aucun intitulé de service enregistré.</p>';
            return;
        }

        if (currentAutonomieTabDiscIndex >= uniqueServiceNames.length) {
            currentAutonomieTabDiscIndex = 0;
        }

        uniqueServiceNames.forEach((intitule, idx) => {
            const isActive = idx === currentAutonomieTabDiscIndex;
            const btn = document.createElement('button');
            btn.className = `tab-btn ${isActive ? 'active' : ''}`;
            btn.textContent = intitule;
            btn.onclick = () => switchAutonomieTab(idx);
            tabsContainer.appendChild(btn);

            const contentDiv = document.createElement('div');
            contentDiv.className = `tab-content ${isActive ? 'active' : ''}`;
            contentDiv.id = `autonomie-tab-${idx}`;

            let tableRowsHtml = '';
            let grandTotalAutonomie = 0;
            let visibleRowsCount = 0;

            levels.forEach(lvl => {
                let totalClasses = 0;
                let volumeHours = 0;
                const otherLevels = new Set();
                let hasCoEns = false;
                let hasOpt = false;

                Object.keys(dataStore).forEach(disc => {
                    dataStore[disc].services.forEach(s => {
                        if (serviceMatchesLevel(s, lvl) && s.name && s.name.trim() === intitule) {
                            totalClasses += (s.classes || 0);
                            volumeHours = (s.hours || 0);
                            if (s.isCoEnseignement) {
                                hasCoEns = true;
                            }
                            if (s.isOptionnel) hasOpt = true;
                            if (Array.isArray(s.levels) && s.levels.length > 1) {
                                s.levels.filter(l => l !== lvl).forEach(l => otherLevels.add(l));
                            }
                        }
                    });
                });

                if (volumeHours > 0) {
                    visibleRowsCount++;
                    const key = getBaseHourKey(lvl, intitule);
                    const baseHourVal = baseHoursStore[key] !== undefined ? baseHoursStore[key] : '';
                    const baseHourNum = parseFloat(baseHourVal) || 0;

                    const cell = computeAutonomieCell(totalClasses, volumeHours, baseHourNum);
                    grandTotalAutonomie += cell.clamped;

                    const linkedBadge = buildLinkedLevelsBadgeHtml(Array.from(otherLevels));
                    const classesDisplay = hasCoEns
                        ? `${(totalClasses / 2)} ${buildCoEnsBadgeHtml()}`
                        : `${totalClasses}`;

                    tableRowsHtml += `
                        <tr data-volhours="${volumeHours}" data-classes="${totalClasses}">
                            <td>
                                <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                                    <strong>${lvl}</strong>
                                    ${linkedBadge}
                                    ${hasOpt ? buildOptBadgeHtml() : ''}
                                </div>
                            </td>
                            <td style="text-align: center;">
                                <input type="number" min="0" step="0.5" value="${baseHourVal}" 
                                    placeholder="0" oninput="updateBaseHour('${lvl}', '${intitule.replace(/'/g, "\\'")}', this)">
                            </td>
                            <td style="text-align: center;">${volumeHours.toFixed(1)} h</td>
                            <td style="text-align: center;">
                                <div style="display: flex; align-items: center; justify-content: center; gap: 6px; flex-wrap: wrap;">
                                    ${classesDisplay}
                                </div>
                            </td>
                            <td style="text-align: center;" class="autonomie-cell">
                                ${cell.html}
                            </td>
                        </tr>
                    `;
                }
            });

            if (visibleRowsCount === 0) {
                contentDiv.innerHTML = `<p class="empty-state">Aucun niveau renseigné avec un volume horaire pour l'intitulé <strong>${intitule}</strong>.</p>`;
            } else {
                const grandBadgeClass = grandTotalAutonomie >= 0 ? 'success' : 'danger';
                let tableHtml = `
                    <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Niveau</th>
                                <th style="text-align: center; width: 140px;">Horaire plancher (h)</th>
                                <th style="text-align: center;">Volume classe (h)</th>
                                <th style="text-align: center;">Nombre de classes</th>
                                <th style="text-align: center;">Autonomie (h)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRowsHtml}
                        </tbody>
                        <tfoot>
                            <tr class="totals-row grand-total">
                                <td colspan="4" style="text-align: right;">Total Autonomie pour ${intitule} :</td>
                                <td style="text-align: center;">
                                    <span class="badge grand-total-badge ${grandBadgeClass}">${grandTotalAutonomie > 0 ? '+' : ''}${grandTotalAutonomie.toFixed(1)} h</span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    </div>
                `;
                contentDiv.innerHTML = tableHtml;
            }

            contentsContainer.appendChild(contentDiv);
        });
    } else if (autonomieMode === 'disciplines') {
        if (disciplines.length === 0) {
            contentsContainer.innerHTML = '<p class="empty-state">Aucune discipline enregistrée.</p>';
            return;
        }

        if (currentAutonomieTabDisciplinesIndex >= disciplines.length) {
            currentAutonomieTabDisciplinesIndex = 0;
        }

        disciplines.forEach((disc, idx) => {
            const isActive = idx === currentAutonomieTabDisciplinesIndex;
            const btn = document.createElement('button');
            btn.className = `tab-btn ${isActive ? 'active' : ''}`;
            btn.textContent = disc;
            btn.onclick = () => switchAutonomieTab(idx);
            tabsContainer.appendChild(btn);

            const contentDiv = document.createElement('div');
            contentDiv.className = `tab-content ${isActive ? 'active' : ''}`;
            contentDiv.id = `autonomie-tab-${idx}`;

            const data = dataStore[disc];

            const serviceMap = {};
            data.services.forEach(s => {
                if (s.name && s.name.trim() !== '') {
                    const keyName = s.name.trim();
                    const svcLevels = getServiceLevels(s);
                    if (!serviceMap[keyName]) {
                        serviceMap[keyName] = [];
                    }
                    svcLevels.forEach(lvl => {
                        serviceMap[keyName].push({
                            level: lvl,
                            classes: s.classes || 0,
                            hours: s.hours || 0,
                            otherLevels: svcLevels.length > 1 ? svcLevels.filter(l => l !== lvl) : [],
                            isCoEnseignement: s.isCoEnseignement || false,
                            isOptionnel: s.isOptionnel || false
                        });
                    });
                }
            });

            const serviceNames = Object.keys(serviceMap).sort();

            if (serviceNames.length === 0) {
                contentDiv.innerHTML = `<p class="empty-state">Aucun service créé dans la discipline <strong>${disc}</strong>.</p>`;
            } else {
                let tableRowsHtml = '';
                let grandTotalAutonomie = 0;

                serviceNames.forEach(intitule => {
                    serviceMap[intitule].forEach(item => {
                        const key = getBaseHourKey(item.level, intitule);
                        const baseHourVal = baseHoursStore[key] !== undefined ? baseHoursStore[key] : '';
                        const baseHourNum = parseFloat(baseHourVal) || 0;

                        const cell = computeAutonomieCell(item.classes, item.hours, baseHourNum);
                        grandTotalAutonomie += cell.clamped;

                        const linkedBadge = buildLinkedLevelsBadgeHtml(item.otherLevels);
                        const coEnsBadge = item.isCoEnseignement ? buildCoEnsBadgeHtml() : '';

                        tableRowsHtml += `
                            <tr data-volhours="${item.hours}" data-classes="${item.classes}">
                                <td>
                                    <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                                        <strong>${intitule} (${item.level})</strong>
                                        ${linkedBadge}
                                        ${item.isOptionnel ? buildOptBadgeHtml() : ''}
                                    </div>
                                </td>
                                <td style="text-align: center;">
                                    <input type="number" min="0" step="0.5" value="${baseHourVal}" 
                                        placeholder="0" oninput="updateBaseHour('${item.level}', '${intitule.replace(/'/g, "\\'")}', this)">
                                </td>
                                <td style="text-align: center;">${item.hours.toFixed(1)} h</td>
                                <td style="text-align: center;">
                                    <div style="display: flex; align-items: center; justify-content: center; gap: 6px; flex-wrap: wrap;">
                                        <span>${item.classes}</span>
                                        ${coEnsBadge}
                                    </div>
                                </td>
                                <td style="text-align: center;" class="autonomie-cell">
                                    ${cell.html}
                                </td>
                            </tr>
                        `;
                    });
                });

                const grandBadgeClass = grandTotalAutonomie >= 0 ? 'success' : 'danger';
                let tableHtml = `
                    <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Intitulé Service / Matière</th>
                                <th style="text-align: center; width: 140px;">Horaire plancher (h)</th>
                                <th style="text-align: center;">Volume classe (h)</th>
                                <th style="text-align: center;">Nombre de classes</th>
                                <th style="text-align: center;">Autonomie (h)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRowsHtml}
                        </tbody>
                        <tfoot>
                            <tr class="totals-row grand-total">
                                <td colspan="4" style="text-align: right;">Total Autonomie pour ${disc} :</td>
                                <td style="text-align: center;">
                                    <span class="badge grand-total-badge ${grandBadgeClass}">${grandTotalAutonomie > 0 ? '+' : ''}${grandTotalAutonomie.toFixed(1)} h</span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    </div>
                `;
                contentDiv.innerHTML = tableHtml;
            }

            contentsContainer.appendChild(contentDiv);
        });
    } else if (autonomieMode === 'synthese') {
        renderAutonomieSyntheseContent(contentsContainer);
    }
}

// Marge utilisée pour les options : identique au calcul affiché dans la fenêtre
// Gestion des enseignements optionnels (Total des cours optionnels - volume financé par la DGH).
function computeMargeUtiliseeOptions() {
    let grandTotalVol = 0;
    let grandTotalFinanced = 0;

    Object.keys(dataStore).forEach(disc => {
        dataStore[disc].services.forEach(s => {
            if (s.isOptionnel) {
                const vol = (s.classes || 0) * (s.hours || 0);
                const financed = s.optFinancedHours !== undefined ? parseFloat(s.optFinancedHours) : 0;
                grandTotalVol += vol;
                grandTotalFinanced += financed;
            }
        });
    });

    return grandTotalVol - grandTotalFinanced;
}

function renderAutonomieSyntheseContent(contentsContainer) {
    const disciplines = Object.keys(dataStore);
    const discAutonomie = {};

    disciplines.forEach(disc => {
        const data = dataStore[disc];
        let discTotal = 0;

        data.services.forEach(s => {
            const svcLevels = getServiceLevels(s);
            // Un service peut être réparti sur plusieurs niveaux : on cumule l'autonomie
            // obtenue pour chacun de ses niveaux, comme dans les autres onglets.
            svcLevels.forEach(lvl => {
                const key = getBaseHourKey(lvl, s.name || '');
                const baseHourNum = parseFloat(baseHoursStore[key]) || 0;
                const classes = s.classes || 0;
                const hours = s.hours || 0;

                const isFloorMatchedOption = s.isOptionnel && Math.abs(baseHourNum - hours) < 0.001;

                if (!isFloorMatchedOption) {
                    // L'horaire plancher est égal à l'horaire attribué : ce service n'est pas
                    // comptabilisé dans l'autonomie de la discipline, mais dans la marge
                    // utilisée pour les options (cf. computeMargeUtiliseeOptions).
                    const cell = computeAutonomieCell(classes, hours, baseHourNum);
                    discTotal += cell.clamped;
                }
            });
        });

        discAutonomie[disc] = discTotal;
    });

    const margeUtiliseeOptions = computeMargeUtiliseeOptions();

    let discRows = disciplines.map(disc => ({ disc, total: discAutonomie[disc] }));

    discRows.sort((a, b) => {
        let valA, valB;
        if (synthesisSortCol === 'disc') {
            valA = a.disc;
            valB = b.disc;
            if (valA < valB) return synthesisSortAsc ? -1 : 1;
            if (valA > valB) return synthesisSortAsc ? 1 : -1;
            return 0;
        } else {
            valA = a.total;
            valB = b.total;
            return synthesisSortAsc ? valA - valB : valB - valA;
        }
    });

    const sortIcon = (col) => synthesisSortCol === col ? (synthesisSortAsc ? '▲' : '▼') : '↕';

    let tableHtml = `
        <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th class="sortable" onclick="handleSynthesisSort('disc')">Discipline <span class="sort-icon">${sortIcon('disc')}</span></th>
                    <th class="sortable" style="text-align: center;" onclick="handleSynthesisSort('total')">Autonomie totale (h) <span class="sort-icon">${sortIcon('total')}</span></th>
                </tr>
            </thead>
            <tbody>
                <tr class="totals-row">
                    <td><strong>Marge utilisée pour les options</strong></td>
                    <td style="text-align: center;">
                        <span class="badge ${margeUtiliseeOptions >= 0 ? 'success' : 'danger'}">${margeUtiliseeOptions > 0 ? '+' : ''}${margeUtiliseeOptions.toFixed(1)} h</span>
                    </td>
                </tr>
    `;

    if (discRows.length === 0) {
        tableHtml += `<tr><td colspan="2" class="empty-state">Aucune discipline enregistrée.</td></tr>`;
    } else {
        discRows.forEach(row => {
            const badgeClass = row.total >= 0 ? 'success' : 'danger';
            tableHtml += `
                <tr>
                    <td>${row.disc}</td>
                    <td style="text-align: center;">
                        <span class="badge ${badgeClass}">${row.total > 0 ? '+' : ''}${row.total.toFixed(1)} h</span>
                    </td>
                </tr>
            `;
        });
    }

    const sumDiscAutonomie = discRows.reduce((sum, row) => sum + row.total, 0);
    const grandTotalHeures = margeUtiliseeOptions + sumDiscAutonomie;
    const grandTotalBadgeClass = grandTotalHeures >= 0 ? 'success' : 'danger';

    tableHtml += `
                <tr class="totals-row grand-total">
                    <td style="text-align: right;"><strong>Total :</strong></td>
                    <td style="text-align: center;">
                        <span class="badge grand-total-badge ${grandTotalBadgeClass}">${grandTotalHeures > 0 ? '+' : ''}${grandTotalHeures.toFixed(1)} h</span>
                    </td>
                </tr>
    `;

    tableHtml += `
            </tbody>
        </table>
        </div>
        <p class="settings-tab-hint" style="margin-top: 12px;">
            Lorsque, pour une option, l'horaire plancher est égal à l'horaire attribué, elle n'est pas comptabilisée dans l'autonomie de sa discipline : son volume est alors intégré à la ligne « Marge utilisée pour les options ».
        </p>
    `;

    contentsContainer.innerHTML = tableHtml;
}

function handleSynthesisSort(col) {
    if (synthesisSortCol === col) {
        synthesisSortAsc = !synthesisSortAsc;
    } else {
        synthesisSortCol = col;
        synthesisSortAsc = true;
    }
    renderAutonomieContent();
}

function switchAutonomieTab(activeIndex) {
    if (autonomieMode === 'level') {
        currentAutonomieTabLevelIndex = activeIndex;
    } else if (autonomieMode === 'disc') {
        currentAutonomieTabDiscIndex = activeIndex;
    } else {
        currentAutonomieTabDisciplinesIndex = activeIndex;
    }
    document.querySelectorAll('#autonomieTabsContainer .tab-btn, #autonomieTabsContainer .level-tab-btn').forEach((btn, i) => btn.classList.toggle('active', i === activeIndex));
    document.querySelectorAll('#autonomieContentsContainer .tab-content').forEach((content, i) => content.classList.toggle('active', i === activeIndex));
}

function openLevelVentilationModal() {
    renderLevelVentilationContent();
    document.getElementById('levelVentilationModal').classList.add('active');
}

function closeLevelVentilationModal() {
    document.getElementById('levelVentilationModal').classList.remove('active');
}

function renderLevelVentilationContent() {
    const tabsContainer = document.getElementById('levelTabsContainer');
    const contentsContainer = document.getElementById('levelContentsContainer');

    tabsContainer.innerHTML = '';
    contentsContainer.innerHTML = '';

    if (levels.length === 0) {
        contentsContainer.innerHTML = '<p class="empty-state">Aucun niveau configuré dans les paramètres.</p>';
        return;
    }

    levels.forEach((lvl, idx) => {
        const btn = document.createElement('button');
        btn.className = `level-tab-btn ${idx === 0 ? 'active' : ''}`;
        btn.textContent = lvl;
        btn.onclick = () => switchLevelTab(idx);
        tabsContainer.appendChild(btn);

        const contentDiv = document.createElement('div');
        contentDiv.className = `tab-content ${idx === 0 ? 'active' : ''}`;
        contentDiv.id = `level-tab-${idx}`;

        // Regroupement : un service (même intitulé, toutes disciplines confondues).
        // « Nbr. classe » = total des classes attribuées à cette matière, toutes disciplines cumulées
        // (les services en co-enseignement portent sur les mêmes classes : on ne les additionne pas).
        const esc = escapeStructureHtml;
        const fmtN = n => String(Math.round(n * 100) / 100).replace('.', ',');
        const services = {};
        Object.keys(dataStore).forEach(disc => {
            const data = dataStore[disc];
            data.services.forEach(sv => {
                if (!serviceMatchesLevel(sv, lvl)) return;
                const name = (sv.name || '').trim() || '(sans intitulé)';
                const key = name.toLowerCase();
                if (!services[key]) services[key] = { name, levels: getServiceLevels(sv), classes: 0, coMax: 0, coEns: false, isSpe: false, isOpt: false, siteSum: {}, siteAny: false, teachers: [] };
                const g = services[key];
                const classes = parseFloat(sv.classes) || 0;
                if (sv.isSpecialite) g.isSpe = true;
                if (sv.isOptionnel) g.isOpt = true;
                if (sv.isCoEnseignement) { g.coEns = true; g.coMax = Math.max(g.coMax, classes); }
                else {
                    g.classes += classes;
                    const split = getServiceSiteSplit(sv);
                    if (split) { g.siteAny = true; Object.keys(split).forEach(id => { g.siteSum[id] = (g.siteSum[id] || 0) + split[id]; }); }
                }
                data.teachers.forEach(t => {
                    if ((parseFloat(sv.allocations && sv.allocations[t]) || 0) > 0 && !g.teachers.some(x => x.t === t && x.disc === disc)) {
                        g.teachers.push({ t, disc });
                    }
                });
            });
        });
        const svcList = Object.values(services).sort((x, y) => x.name.localeCompare(y.name, 'fr'));

        if (svcList.length === 0) {
            contentDiv.innerHTML = `<p class="empty-state">Aucun service n'a été créé pour le niveau <strong>${esc(lvl)}</strong>.</p>`;
        } else {
            let body = '';
            svcList.forEach(g => {
                const linkedBadge = g.levels.length > 1 ? buildLinkedLevelsBadgeHtml(g.levels.filter(l => l !== lvl)) : '';
                const people = g.teachers.slice().sort((x, y) => x.t.localeCompare(y.t, 'fr'));
                const peopleHtml = people.length
                    ? people.map(p => `<div class="are-list-person">${esc(p.t)} <span>(${esc(p.disc)})</span></div>`).join('')
                    : '<span style="color: var(--text-muted); font-style: italic; font-size: 0.85rem;">Aucun enseignant affecté</span>';
                body += `<tr class="are-list-first"><td class="are-list-name"><strong>${esc(g.name)}</strong>${(linkedBadge || g.isSpe || g.isOpt) ? `<div style="margin-top:4px; display:flex; gap:4px; flex-wrap:wrap; justify-content:center;">${linkedBadge}${g.isSpe ? buildSpeBadgeHtml() : ''}${g.isOpt ? buildOptBadgeHtml() : ''}</div>` : ''}</td>`
                    + `<td class="num are-list-hours">${fmtN(g.classes + g.coMax)}${g.coEns ? ' <span class="coens-inline-badge">Co-E</span>' : ''}${siteSplitHtml(g, fmtN)}</td><td>${peopleHtml}</td></tr>`;
            });
            contentDiv.innerHTML = `
                <table class="are-list-table level-svc-table">
                    <thead><tr><th class="are-list-name">Service</th><th class="num">Nbr. classe</th><th>Enseignants</th></tr></thead>
                    <tbody>${body}</tbody>
                </table>`;
        }

        contentsContainer.appendChild(contentDiv);
    });
}

function switchLevelTab(activeIndex) {
    document.querySelectorAll('#levelTabsContainer .level-tab-btn').forEach((btn, i) => btn.classList.toggle('active', i === activeIndex));
    document.querySelectorAll('#levelContentsContainer .tab-content').forEach((content, i) => content.classList.toggle('active', i === activeIndex));
}

function openSettingsModal(tab) {
    if (tab) { switchSettingsTab(tab); } else { renderSettingsModal(); }
    document.getElementById('settingsModal').classList.add('active');
}

function closeSettingsModal() {
    document.getElementById('settingsModal').classList.remove('active');
}

function switchSettingsTab(tab) {
    settingsActiveTab = tab;
    const map = { eple: 'Eple', features: 'Features', levels: 'Levels', disciplines: 'Disc', tools: 'Tools' };
    const panel = { eple: 'settingsEpleTab', features: 'settingsFeaturesTab', levels: 'settingsLevelsTab', disciplines: 'settingsDisciplinesTab', tools: 'settingsToolsTab' };
    Object.keys(map).forEach(k => {
        const b = document.getElementById('btnSettings' + map[k]);
        if (b) b.classList.toggle('active', k === tab);
        const p = document.getElementById(panel[k]);
        if (p) p.classList.toggle('active', k === tab);
    });
    renderSettingsModal();
}

function renderSettingsModal() {
    if (settingsActiveTab === 'eple' || settingsActiveTab === 'features') {
        renderEpleSelectedCard(); // synchronise aussi les cases des fonctionnalités
    } else if (settingsActiveTab === 'levels') {
        renderLevelsList();
    } else if (settingsActiveTab === 'tools' || settingsActiveTab === 'features') {
        // Onglets statiques : rien à générer
    } else {
        renderDisciplinesList();
    }
}

function moveLevel(index, direction) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= levels.length) return;

    const temp = levels[index];
    levels[index] = levels[targetIndex];
    levels[targetIndex] = temp;

    renderLevelsList();
    renderApp();
}

function handleLevelDragStart(index, event) {
    draggedLevelIdx = index;
    event.dataTransfer.effectAllowed = 'move';
}

function handleLevelDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    event.currentTarget.classList.add('drag-over');
}

function handleLevelDragLeave(event) {
    event.currentTarget.classList.remove('drag-over');
}

function handleLevelDrop(targetIndex, event) {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');
    if (draggedLevelIdx === null || draggedLevelIdx === targetIndex) return;

    const movedLevel = levels.splice(draggedLevelIdx, 1)[0];
    levels.splice(targetIndex, 0, movedLevel);

    draggedLevelIdx = null;
    renderLevelsList();
    renderApp();
}

function renderLevelsList() {
    const listEl = document.getElementById('levelsList');
    listEl.innerHTML = '';
    levels.forEach((lvl, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === levels.length - 1;

        const li = document.createElement('li');
        li.className = 'settings-item draggable-level';
        li.draggable = true;
        li.ondragstart = (e) => handleLevelDragStart(idx, e);
        li.ondragover = (e) => handleLevelDragOver(e);
        li.ondragleave = (e) => handleLevelDragLeave(e);
        li.ondrop = (e) => handleLevelDrop(idx, e);

        li.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="cursor: grab; opacity: 0.5;" title="Glisser pour réordonner">⋮⋮</span>
                <span>${lvl}</span>
            </div>
            <div class="settings-item-actions">
                <button class="edit-btn-icon ${isFirst ? 'disabled' : ''}" style="${isFirst ? 'opacity: 0.3; cursor: default;' : ''}" title="Monter" onclick="moveLevel(${idx}, -1)">▲</button>
                <button class="edit-btn-icon ${isLast ? 'disabled' : ''}" style="${isLast ? 'opacity: 0.3; cursor: default;' : ''}" title="Descendre" onclick="moveLevel(${idx}, 1)">▼</button>
                <button class="edit-btn-icon" title="Modifier le nom de ce niveau" onclick="editLevel(${idx})">✏️</button>
                <button class="delete-btn-icon" title="Supprimer ce niveau" onclick="removeLevel(${idx})">✕</button>
            </div>
        `;
        listEl.appendChild(li);
    });
}

function addLevel() {
    const input = document.getElementById('newLevelInput');
    const val = input.value.trim();
    if (val) {
        if (!levels.includes(val)) {
            levels.push(val);
            input.value = '';
            renderLevelsList();
            renderApp();
        } else {
            alert("Ce niveau existe déjà.");
        }
    }
}

function editLevel(idx) {
    const oldName = levels[idx];
    const newName = prompt(`Nouveau nom pour le niveau "${oldName}" :`, oldName);
    if (newName && newName.trim() && newName.trim() !== oldName) {
        const trimmed = newName.trim();
        if (levels.includes(trimmed)) {
            alert("Un niveau porte déjà ce nom.");
            return;
        }
        levels[idx] = trimmed;

        Object.keys(dataStore).forEach(disc => {
            dataStore[disc].services.forEach(s => {
                if (s.level === oldName) {
                    s.level = trimmed;
                }
            });
        });

        const newBaseHoursStore = {};
        Object.keys(baseHoursStore).forEach(key => {
            if (key.startsWith(`${oldName}_`)) {
                const servicePart = key.substring(oldName.length + 1);
                newBaseHoursStore[`${trimmed}_${servicePart}`] = baseHoursStore[key];
            } else {
                newBaseHoursStore[key] = baseHoursStore[key];
            }
        });
        baseHoursStore = newBaseHoursStore;

        renderLevelsList();
        renderApp();
    }
}

function removeLevel(idx) {
    if (confirm(`Supprimer le niveau "${levels[idx]}" ?`)) {
        levels.splice(idx, 1);
        renderLevelsList();
        renderApp();
    }
}

function renderDisciplinesList() {
    const listEl = document.getElementById('disciplinesList');
    listEl.innerHTML = '';
    const disciplines = Object.keys(dataStore);

    if (disciplines.length === 0) {
        listEl.innerHTML = '<li class="empty-state" style="padding: 12px; font-size: 0.85rem;">Aucune discipline configurée.</li>';
        return;
    }

    disciplines.forEach(disc => {
        const li = document.createElement('li');
        li.className = 'settings-item';
        li.innerHTML = `
            <span>${disc}</span>
            <div class="settings-item-actions">
                <button class="edit-btn-icon" title="Modifier le nom de cette discipline" onclick="editDisciplineName('${disc.replace(/'/g, "\\'")}')">✏️</button>
                <button class="delete-btn-icon" title="Supprimer cette discipline" onclick="deleteDisciplineFromSettings('${disc.replace(/'/g, "\\'")}')">✕</button>
            </div>
        `;
        listEl.appendChild(li);
    });
}

function addDisciplineFromSettings() {
    const input = document.getElementById('newDisciplineInput');
    const val = input.value.trim();
    if (val) {
        if (!dataStore[val]) {
            dataStore[val] = {
                deleteMode: false,
                enableSpecialites: false,
                enableOptionnels: false,
                enableCoEnseignement: false,
                enableMultiNiveau: false,
                sortCol: null,
                sortAsc: true,
                teachers: [],
                apports: {},
                services: []
            };
            input.value = '';
            renderDisciplinesList();
            renderApp();
        } else {
            alert("Cette discipline existe déjà.");
        }
    }
}

function editDisciplineName(oldName) {
    const newName = prompt(`Nouveau nom pour la discipline "${oldName}" :`, oldName);
    if (newName && newName.trim() && newName.trim() !== oldName) {
        const trimmed = newName.trim();
        if (dataStore[trimmed]) {
            alert("Une discipline porte déjà ce nom.");
            return;
        }

        dataStore[trimmed] = dataStore[oldName];
        delete dataStore[oldName];
        coordinators.forEach(e => { e.discs = (e.discs || []).map(d => d === oldName ? trimmed : d); });

        renderDisciplinesList();
        renderApp();
    }
}

function deleteDisciplineFromSettings(disc) {
    if (confirm(`Voulez-vous vraiment supprimer la discipline "${disc}" ?`)) {
        delete dataStore[disc];
        currentActiveTabIndex = 0;
        renderDisciplinesList();
        renderApp();
    }
}

// ============================================================
// Ouvrir / enregistrer dans le même fichier (Chrome, Edge : File System Access API)
// Utile avec un dossier synchronisé (Nuage / Nextcloud) : le fichier est mis à jour sur place.
// Sur les autres navigateurs, le comportement reste le téléchargement habituel.
// ============================================================
let currentFileHandle = null;
let currentFileName = '';
const fsAccessSupported = () => typeof window.showOpenFilePicker === 'function' && typeof window.showSaveFilePicker === 'function';

function setCurrentFile(handle, name) {
    currentFileHandle = handle || null;
    currentFileName = handle ? (name || handle.name || '') : '';
    const lbl = document.getElementById('currentFileLabel');
    if (lbl) lbl.textContent = currentFileName ? `Fichier : ${currentFileName}` : '';
    const bar = document.getElementById('currentFileBadge');
    if (bar) { bar.textContent = currentFileName ? `📄 ${currentFileName}` : ''; bar.style.display = currentFileName ? 'inline-block' : 'none'; }
}

function showAppToast(msg, isError) {
    let t = document.getElementById('appToast');
    if (!t) { t = document.createElement('div'); t.id = 'appToast'; t.className = 'app-toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.toggle('error', !!isError);
    t.classList.add('show');
    clearTimeout(showAppToast._t);
    showAppToast._t = setTimeout(() => t.classList.remove('show'), isError ? 4500 : 2200);
}

function suggestedFileName() {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const dateStr = `${now.getFullYear()}_${pad(now.getMonth() + 1)}_${pad(now.getDate())}`;
    const epleName = ((epleIdentity && epleIdentity.name) || '').trim()
        .replace(/[\\/:*?"<>|]+/g, ' ').replace(/\s+/g, '_').replace(/^_+|_+$/g, '') || 'EPLE';
    return `${dateStr}_DHG_${epleName}.json`;
}

function buildSaveJson() {
    const exportObject = {
        epleIdentity: epleIdentity,
        dotation: dotationGlobal,
        levels: levels,
        baseHoursStore: baseHoursStore,
        dataStore: dataStore,
        coEnseignementGroups: coEnseignementGroups,
        coordinators: coordinators,
        n1Reference: n1Reference,
        enrollment: enrollmentForecast,
        changeHistory: changeHistory
    };
    return JSON.stringify(exportObject, null, 2);
}

function downloadJson(text, name) {
    const blob = new Blob([text], { type: 'application/json' });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', blobUrl);
    a.setAttribute('download', name);
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
}

// Enregistrer : dans le fichier ouvert s'il existe ; sinon boîte « Enregistrer sous » (ou téléchargement)
async function saveState(forcePick) {
    recordHistoryPoint();
    const text = buildSaveJson();
    if (!fsAccessSupported()) { downloadJson(text, suggestedFileName()); return; }
    try {
        let handle = forcePick === true ? null : currentFileHandle;
        if (!handle) {
            handle = await window.showSaveFilePicker({
                suggestedName: currentFileName || suggestedFileName(),
                types: [{ description: 'Sauvegarde VectisDHG', accept: { 'application/json': ['.json'] } }]
            });
        }
        const w = await handle.createWritable();
        await w.write(text);
        await w.close();
        setCurrentFile(handle);
        showAppToast(`✓ Enregistré dans ${handle.name}`);
    } catch (err) {
        if (err && err.name === 'AbortError') return;   // boîte fermée par l'utilisateur
        // droit refusé, fichier supprimé ou déplacé : on bascule sur le téléchargement classique
        setCurrentFile(null);
        downloadJson(text, suggestedFileName());
        showAppToast("Écriture directe impossible : le fichier a été téléchargé.", true);
    }
}

// Ouvrir en gardant un accès au fichier, pour le réenregistrer ensuite sur place
async function openWithPicker() {
    try {
        const [handle] = await window.showOpenFilePicker({
            multiple: false,
            types: [{ description: 'Sauvegarde VectisDHG', accept: { 'application/json': ['.json'] } }]
        });
        const file = await handle.getFile();
        const loaded = JSON.parse(await file.text());
        applyLoadedData(loaded);
        setCurrentFile(handle, file.name);
        showAppToast(`Ouvert : ${file.name}`);
    } catch (err) {
        if (err && err.name === 'AbortError') return;
        alert("Erreur lors de la lecture du fichier JSON.");
    }
}

function initFileMenu() {
    const supported = fsAccessSupported();
    const openBtn = document.getElementById('btnOpenPicker');
    const openLabel = document.getElementById('openFallbackLabel');
    const saveAs = document.getElementById('btnSaveAs');
    if (openBtn) openBtn.style.display = supported ? '' : 'none';
    if (openLabel) openLabel.style.display = supported ? 'none' : '';
    if (saveAs) saveAs.style.display = supported ? '' : 'none';
    document.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey && e.key.toLowerCase() === 's') {
            e.preventDefault();
            saveState();
        }
    });
}

function applyLoadedData(loadedData) {
    if (loadedData.dataStore) {
        dataStore = loadedData.dataStore;
        Object.keys(dataStore).forEach(disc => {
            if (!dataStore[disc].apports) {
                dataStore[disc].apports = {};
            }
            if (dataStore[disc].enableSpecialites === undefined) {
                dataStore[disc].enableSpecialites = false;
            }
            if (dataStore[disc].enableOptionnels === undefined) {
                dataStore[disc].enableOptionnels = false;
            }
            if (dataStore[disc].enableCoEnseignement === undefined) {
                dataStore[disc].enableCoEnseignement = false;
            }
            if (dataStore[disc].enableMultiNiveau === undefined) {
                dataStore[disc].enableMultiNiveau = false;
            }
            dataStore[disc].services.forEach(s => {
                if (s.locked === undefined) s.locked = false;
                if (s.isSpecialite === undefined) s.isSpecialite = false;
                if (s.isOptionnel === undefined) s.isOptionnel = false;
                if (s.isCoEnseignement === undefined) s.isCoEnseignement = false;
                if (s.isMultiNiveau === undefined) s.isMultiNiveau = false;
                if (s.optFinancedHours === undefined) s.optFinancedHours = 0;
            });
        });
        dotationGlobal = loadedData.dotation || { hp: 0, hsa: 0 };
        if (Array.isArray(loadedData.levels)) {
            levels = loadedData.levels;
        }
        if (loadedData.baseHoursStore) {
            baseHoursStore = loadedData.baseHoursStore;
        }
        coEnseignementGroups = Array.isArray(loadedData.coEnseignementGroups) ? loadedData.coEnseignementGroups : [];
        coordinators = Array.isArray(loadedData.coordinators) ? loadedData.coordinators : [];
        enrollmentForecast = normalizeEnrollment(loadedData.enrollment);
        n1Reference = loadedData.n1Reference && typeof loadedData.n1Reference === 'object'
            ? Object.assign({ enabled: false, file: '', epleName: '', levels: [], names: {}, flags: {} }, loadedData.n1Reference)
            : { enabled: false, file: '', epleName: '', levels: [], names: {}, flags: {} };
        changeHistory = Array.isArray(loadedData.changeHistory) ? loadedData.changeHistory : [];
        if (loadedData.epleIdentity) {
            epleIdentity = loadedData.epleIdentity;
            if (epleIdentity.enableSpecialites === undefined) {
                epleIdentity.enableSpecialites = false;
            }
            if (epleIdentity.enableOptionnels === undefined) {
                epleIdentity.enableOptionnels = false;
            }
            if (epleIdentity.enableCoEnseignement === undefined) {
                epleIdentity.enableCoEnseignement = false;
            }
            if (epleIdentity.enableMultiNiveau === undefined) {
                epleIdentity.enableMultiNiveau = false;
            }
            if (epleIdentity.enableMultiSite === undefined) epleIdentity.enableMultiSite = false;
            if (!Array.isArray(epleIdentity.sites)) epleIdentity.sites = [];
            if (epleIdentity.enablePonderations === undefined) {
                // Anciennes sauvegardes : on active la gestion si des services pondérés existent
                epleIdentity.enablePonderations = Object.values(dataStore).some(d => d && Array.isArray(d.services) && d.services.some(sv => sv.ponderationActive));
            }
        }
    } else if (typeof loadedData === 'object' && loadedData !== null) {
        dataStore = loadedData;
    }

    currentActiveTabIndex = 0;
    currentAutonomieTabLevelIndex = 0;
    currentAutonomieTabDiscIndex = 0;
    currentAutonomieTabDisciplinesIndex = 0;
    resetHistoryBaseline();
    updateAppTitle();
    renderApp();
}

function handleJsonLoad(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const loadedData = JSON.parse(event.target.result);
            applyLoadedData(loadedData);
            setCurrentFile(null);
        } catch (err) {
            alert("Erreur lors de la lecture du fichier JSON.");
        }
    };
    reader.readAsText(file);
}

function loadTestDataset() {
    if (!confirm("Charger le jeu de données de test ? Cela remplacera toutes les données actuellement saisies dans l'application (pensez à sauvegarder votre travail en cours si besoin).")) {
        return;
    }
    try {
        const loadedData = JSON.parse(JSON.stringify(testDataset));
        applyLoadedData(loadedData);
        setCurrentFile(null);
        closeSettingsModal();
    } catch (err) {
        alert("Erreur lors du chargement du jeu de test.");
    }
}

async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
        await ensureXlsxLoaded();
    } catch (err) {
        alert(err.message);
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(firstSheet);

        if (rows.length === 0 || !rows[0].Discipline || !rows[0].Nom) {
            alert("Le fichier doit contenir au minimum les colonnes : 'Nom', 'Prénom', 'Discipline'");
            return;
        }

        dataStore = {};
        rows.forEach(r => {
            const discipline = (r.Discipline || "Non spécifié").trim();
            const teacher = `${(r.Nom || "").trim().toUpperCase()} ${(r.Prénom || r.Prenom || "").trim()}`;
            const orsRaw = r.ORS !== undefined ? r.ORS : (r.Ors !== undefined ? r.Ors : (r.ors !== undefined ? r.ors : (r.Apport !== undefined ? r.Apport : (r.apport !== undefined ? r.apport : 18))));
            const apportVal = parseFloat(orsRaw) || 0;
            
            if (!dataStore[discipline]) {
                dataStore[discipline] = { deleteMode: false, enableSpecialites: false, enableOptionnels: false, enableCoEnseignement: false, enableMultiNiveau: false, sortCol: null, sortAsc: true, teachers: [], apports: {}, services: [] };
            }
            if (!dataStore[discipline].teachers.includes(teacher)) {
                dataStore[discipline].teachers.push(teacher);
                dataStore[discipline].apports[teacher] = apportVal;
            }
        });

        currentActiveTabIndex = 0;
        currentAutonomieTabLevelIndex = 0;
        currentAutonomieTabDiscIndex = 0;
        currentAutonomieTabDisciplinesIndex = 0;
        renderApp();
    };
    reader.readAsBinaryString(file);
}

function deleteDiscipline(disc) {
    if (confirm(`Voulez-vous vraiment supprimer la discipline "${disc}" et l'ensemble de ses données ?`)) {
        delete dataStore[disc];
        currentActiveTabIndex = 0;
        renderApp();
    }
}

function renderApp() {
    updateNorvegienBar();
    refreshN1Datalists();
    updateAppTitle();
    updateSpecialiteButtonVisibility();
    const tabsContainer = document.getElementById('tabsContainer');
    const contentsContainer = document.getElementById('contentsContainer');
    
    tabsContainer.innerHTML = '';
    contentsContainer.innerHTML = '';

    const disciplines = Object.keys(dataStore);

    if (disciplines.length === 0) {
        contentsContainer.innerHTML = '<div class="empty-state">Aucune discipline chargée. Importez un fichier Excel ou restaurez une sauvegarde pour démarrer.</div>';
        return;
    }

    if (currentActiveTabIndex >= disciplines.length) {
        currentActiveTabIndex = 0;
    }

    disciplines.forEach((disc, index) => {
        const isActive = index === currentActiveTabIndex;
        const isDeleteMode = dataStore[disc].deleteMode;

        const tabBtn = document.createElement('button');
        tabBtn.className = `tab-btn ${isActive ? 'active' : ''}`;
        
        let deleteIconHtml = isDeleteMode 
            ? `<span class="delete-btn-icon" title="Supprimer la discipline ${disc}" onclick="event.stopPropagation(); deleteDiscipline('${disc.replace(/'/g, "\\'")}')">✕</span>` 
            : '';

        const isFirst = index === 0;
        const isLast = index === disciplines.length - 1;

        tabBtn.innerHTML = `
            <div class="tab-title-row">
                ${deleteIconHtml} <span>${disc}</span>
            </div>
            <div class="tab-move-arrows">
                <span class="arrow-btn ${isFirst ? 'disabled' : ''}" title="Déplacer à gauche" onclick="moveDiscipline(${index}, -1, event)">◀</span>
                <span class="arrow-btn ${isLast ? 'disabled' : ''}" title="Déplacer à droite" onclick="moveDiscipline(${index}, 1, event)">▶</span>
            </div>
        `;
        tabBtn.onclick = () => switchTab(index);
        tabsContainer.appendChild(tabBtn);

        const contentDiv = document.createElement('div');
        contentDiv.className = `tab-content ${isActive ? 'active' : ''}`;
        contentDiv.id = `tab-${index}`;
        
        contentDiv.appendChild(createActionBar(disc));
        contentDiv.appendChild(createTable(disc));
        
        contentsContainer.appendChild(contentDiv);
    });

    document.querySelectorAll('.level-select').forEach(autoAdjustLevelSelect);
    requestAnimationFrame(updateTeacherNameReminders);
}

function switchTab(activeIndex) {
    currentActiveTabIndex = activeIndex;
    document.querySelectorAll('#tabsContainer .tab-btn').forEach((btn, i) => btn.classList.toggle('active', i === activeIndex));
    setTimeout(updateTeacherNameReminders, 0);
    document.querySelectorAll('#contentsContainer .tab-content').forEach((content, i) => content.classList.toggle('active', i === activeIndex));
}

// Remet à zéro toutes les heures ventilées aux enseignants pour une discipline, en un clic,
// sans toucher aux autres éléments (services, niveaux, classes, volumes, pondérations...).
function clearDisciplineAllocations(disc) {
    const data = dataStore[disc];
    if (!data) return;

    if (!confirm(`Voulez-vous vraiment vider toutes les heures ventilées aux enseignants pour la discipline "${disc}" ? Les services, niveaux, classes et volumes horaires seront conservés.`)) {
        return;
    }

    data.services.forEach(s => {
        if (s.allocations) {
            Object.keys(s.allocations).forEach(t => {
                s.allocations[t] = 0;
            });
        }
    });

    renderApp();
}

function createActionBar(disc) {
    const bar = document.createElement('div');
    bar.className = 'action-bar';
    bar.style.flexDirection = 'column';
    bar.style.alignItems = 'flex-start';
    bar.style.gap = '10px';

    const titleRow = document.createElement('div');
    titleRow.className = 'discipline-title-row';
    const discTitle = document.createElement('h3');
    discTitle.className = 'discipline-table-title';
    discTitle.textContent = disc;
    titleRow.appendChild(discTitle);
    const summaryBox = document.createElement('div');
    summaryBox.className = 'disc-summary';
    summaryBox.dataset.disc = disc;
    summaryBox.innerHTML = buildDisciplineSummaryHtml(disc);

    bar.appendChild(titleRow);

    const mainRow = document.createElement('div');
    mainRow.className = 'actions-row';
    mainRow.style.display = 'flex';
    mainRow.style.gap = '12px';
    mainRow.style.flexWrap = 'wrap';
    mainRow.style.width = '100%';
    mainRow.style.alignItems = 'center';

    const addServiceBtn = document.createElement('button');
    addServiceBtn.className = 'btn-secondary';
    addServiceBtn.textContent = '➕ Ajouter un service';
    addServiceBtn.onclick = () => {
        const defaultLvl = levels.length > 0 ? levels[0] : '';
        dataStore[disc].services.push({
            level: defaultLvl,
            levels: [defaultLvl],
            name: "",
            classes: 1,
            hours: 1,
            ponderationActive: false,
            ponderationFactor: 1.1,
            isSpecialite: false,
            isOptionnel: false,
            isCoEnseignement: false,
            isMultiNiveau: false,
            locked: false,
            allocations: {}
        });
        renderApp();
    };

    const addTeacherBtn = document.createElement('button');
    addTeacherBtn.className = 'btn-secondary';
    addTeacherBtn.textContent = '👤 Ajouter un enseignant';
    addTeacherBtn.onclick = () => {
        const name = prompt("Nom et Prénom de l'enseignant :");
        if (name && name.trim()) {
            const trimmed = name.trim();
            if (dataStore[disc].teachers.includes(trimmed)) { alert(`Un enseignant nommé « ${trimmed} » existe déjà dans cette discipline.`); return; }
            applyTeacherAdd(disc, trimmed, 18);
            renderApp();
        }
    };

    const deleteToggleBtn = document.createElement('button');
    const isDeleteMode = dataStore[disc].deleteMode;
    deleteToggleBtn.className = `btn-danger-mode ${isDeleteMode ? 'active' : ''}`;
    deleteToggleBtn.textContent = isDeleteMode ? '✖ Masquer la suppression / modification' : '🗑️ Suppression / Modification';
    deleteToggleBtn.onclick = () => {
        dataStore[disc].deleteMode = !dataStore[disc].deleteMode;
        renderApp();
    };

    const clearAllocationsBtn = document.createElement('button');
    clearAllocationsBtn.className = 'btn-secondary';
    clearAllocationsBtn.textContent = '🧹 Vider les heures ventilées';
    clearAllocationsBtn.title = "Remet à zéro les heures ventilées à chaque enseignant pour cette discipline, sans toucher aux autres éléments (services, classes, volumes, niveaux...)";
    clearAllocationsBtn.onclick = () => clearDisciplineAllocations(disc);

    mainRow.appendChild(addServiceBtn);
    mainRow.appendChild(addTeacherBtn);
    mainRow.appendChild(clearAllocationsBtn);
    const hoursFormatBtn = document.createElement('button');
    hoursFormatBtn.className = 'btn-secondary hours-format-btn';
    const isSexa = dataStore[disc].hoursFormat === 'sexa';
    hoursFormatBtn.textContent = isSexa ? '🔢 Heures décimales' : '⏱️ Heures sexagésimales';
    hoursFormatBtn.title = isSexa
        ? "Revenir à l'affichage en heures décimales (ex. 1,25 h) pour les totaux de cette discipline"
        : "Afficher les totaux de cette discipline en heures et minutes (ex. 1,25 h → 1h15)";
    hoursFormatBtn.onclick = () => toggleHoursFormat(disc);
    mainRow.appendChild(hoursFormatBtn);
    mainRow.appendChild(deleteToggleBtn);

    if (isDeleteMode) {
        const deleteDiscBtn = document.createElement('button');
        deleteDiscBtn.className = 'btn-danger-mode';
        deleteDiscBtn.textContent = '🗑️ Supprimer cette discipline';
        deleteDiscBtn.onclick = () => deleteDiscipline(disc);
        mainRow.appendChild(deleteDiscBtn);
    }

    // Fonction en cours de développement : bouton non cliquable avec bulle d'information
    const magicBtn = document.createElement('button');
    magicBtn.className = 'btn-secondary magic-btn';
    magicBtn.type = 'button';
    magicBtn.textContent = '🪄';
    magicBtn.title = 'Ventilation automatique des heures restant à ventiler';
    magicBtn.setAttribute('aria-label', 'Ventilation automatique des heures');
    magicBtn.onclick = () => openMagicModal(disc);
    mainRow.appendChild(magicBtn);

    const postitBtn = document.createElement('button');
    const hasNote = !!((dataStore[disc].note || '').trim());
    postitBtn.className = 'btn-secondary postit-btn' + (hasNote ? ' has-note' : '');
    postitBtn.type = 'button';
    postitBtn.textContent = '📝';
    postitBtn.title = hasNote ? 'Post-it (une note est enregistrée)' : 'Ajouter un post-it (notes libres)';
    postitBtn.setAttribute('aria-label', 'Post-it de la discipline');
    postitBtn.dataset.disc = disc;
    postitBtn.onclick = () => openPostitModal(disc);
    mainRow.appendChild(postitBtn);

    const svcList = dataStore[disc].services || [];
    if (svcList.length) {
        const nLocked = svcList.filter(sv => sv.locked).length;
        const allLocked = nLocked === svcList.length;
        const lockAllBtn = document.createElement('button');
        lockAllBtn.className = 'btn-secondary lockall-btn' + (allLocked ? ' all-locked' : (nLocked ? ' some-locked' : ''));
        lockAllBtn.type = 'button';
        lockAllBtn.textContent = allLocked ? '🔒' : (nLocked ? '🔐' : '🔓');
        lockAllBtn.title = allLocked
            ? `Tous les services sont verrouillés (${nLocked}/${svcList.length}) — cliquer pour tout déverrouiller`
            : `Verrouiller les ${svcList.length} services de la discipline${nLocked ? ` (${nLocked} déjà verrouillé${nLocked > 1 ? 's' : ''})` : ''}`;
        lockAllBtn.setAttribute('aria-label', 'Verrouiller ou déverrouiller tous les services de la discipline');
        lockAllBtn.onclick = () => toggleLockAllServices(disc);
        mainRow.appendChild(lockAllBtn);
    }

    mainRow.appendChild(summaryBox);
    bar.appendChild(mainRow);

    const togglesRow = document.createElement('div');
    togglesRow.className = 'actions-row';
    togglesRow.style.display = 'flex';
    togglesRow.style.gap = '12px';
    togglesRow.style.flexWrap = 'wrap';
    togglesRow.style.width = '100%';

    if (epleIdentity.enableSpecialites) {
        const discSpeChecked = dataStore[disc].enableSpecialites || false;
        const discSpeToggleBox = document.createElement('label');
        discSpeToggleBox.className = `disc-spe-toggle-box ${discSpeChecked ? 'active-mode' : ''}`;
        discSpeToggleBox.innerHTML = `
            <input type="checkbox" ${discSpeChecked ? 'checked' : ''} onchange="toggleDisciplineSpecialite('${disc.replace(/'/g, "\\'")}', this.checked)">
            ${discSpeChecked ? 'Masquer la gestion des spécialités' : 'Activer la gestion des spécialités'}
        `;
        togglesRow.appendChild(discSpeToggleBox);
    }

    if (epleIdentity.enableOptionnels) {
        const discOptChecked = dataStore[disc].enableOptionnels || false;
        const discOptToggleBox = document.createElement('label');
        discOptToggleBox.className = `disc-opt-toggle-box ${discOptChecked ? 'active-mode' : ''}`;
        discOptToggleBox.innerHTML = `
            <input type="checkbox" ${discOptChecked ? 'checked' : ''} onchange="toggleDisciplineOptionnel('${disc.replace(/'/g, "\\'")}', this.checked)">
            ${discOptChecked ? 'Masquer la gestion des enseignements optionnels' : 'Activer la gestion des enseignements optionnels'}
        `;
        togglesRow.appendChild(discOptToggleBox);
    }

    if (epleIdentity.enableCoEnseignement) {
        const discCoEnsChecked = dataStore[disc].enableCoEnseignement || false;
        const discCoEnsToggleBox = document.createElement('label');
        discCoEnsToggleBox.className = `disc-coens-toggle-box ${discCoEnsChecked ? 'active-mode' : ''}`;
        discCoEnsToggleBox.innerHTML = `
            <input type="checkbox" ${discCoEnsChecked ? 'checked' : ''} onchange="toggleDisciplineCoEnseignement('${disc.replace(/'/g, "\\'")}', this.checked)">
            ${discCoEnsChecked ? 'Masquer la gestion du co-enseignement' : 'Activer la gestion du co-enseignement'}
        `;
        togglesRow.appendChild(discCoEnsToggleBox);
    }

    if (epleIdentity.enableMultiNiveau) {
        const discMultiChecked = dataStore[disc].enableMultiNiveau || false;
        const discMultiToggleBox = document.createElement('label');
        discMultiToggleBox.className = `disc-multi-toggle-box ${discMultiChecked ? 'active-mode' : ''}`;
        discMultiToggleBox.innerHTML = `
            <input type="checkbox" ${discMultiChecked ? 'checked' : ''} onchange="toggleDisciplineMultiNiveau('${disc.replace(/'/g, "\\'")}', this.checked)">
            ${discMultiChecked ? 'Masquer la gestion des services multi-niveau' : 'Activer la gestion des services multi-niveau'}
        `;
        togglesRow.appendChild(discMultiToggleBox);
    }

    if (togglesRow.children.length > 0) {
        bar.appendChild(togglesRow);
    }

    return bar;
}

function handleSort(disc, columnKey) {
    const data = dataStore[disc];
    if (data.sortCol === columnKey) {
        data.sortAsc = !data.sortAsc;
    } else {
        data.sortCol = columnKey;
        data.sortAsc = true;
    }

    data.services.sort((a, b) => {
        let valA, valB;
        if (columnKey === 'level') {
            valA = levels.indexOf(a.level);
            valB = levels.indexOf(b.level);
            if (valA === -1) valA = 999;
            if (valB === -1) valB = 999;
        } else if (columnKey === 'name') {
            valA = (a.name || '').toLowerCase();
            valB = (b.name || '').toLowerCase();
        } else if (columnKey === 'classes') {
            valA = a.classes || 0;
            valB = b.classes || 0;
        } else if (columnKey === 'hours') {
            valA = a.hours || 0;
            valB = b.hours || 0;
        } else if (columnKey === 'ponderation') {
            valA = a.ponderationActive ? (a.ponderationFactor || 1.1) : 1;
            valB = b.ponderationActive ? (b.ponderationFactor || 1.1) : 1;
        } else if (columnKey === 'target') {
            valA = (a.classes || 0) * (a.hours || 0);
            valB = (b.classes || 0) * (b.hours || 0);
        }

        if (valA < valB) return data.sortAsc ? -1 : 1;
        if (valA > valB) return data.sortAsc ? 1 : -1;
        return 0;
    });

    renderApp();
}

function handleDragStart(disc, index, event) {
    draggedTeacherIdx = index;
    event.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    event.currentTarget.classList.add('drag-over');
}

function handleDragLeave(event) {
    event.currentTarget.classList.remove('drag-over');
}

function handleDrop(disc, targetIndex, event) {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');
    if (draggedTeacherIdx === null || draggedTeacherIdx === targetIndex) return;

    const teachers = dataStore[disc].teachers;
    const movedTeacher = teachers.splice(draggedTeacherIdx, 1)[0];
    teachers.splice(targetIndex, 0, movedTeacher);

    draggedTeacherIdx = null;
    renderApp();
}

function updateApport(disc, teacher, value, inputEl) {
    if (!dataStore[disc].apports) dataStore[disc].apports = {};
    const val = parseFloat(value) || 0;
    dataStore[disc].apports[teacher] = val;

    const table = inputEl.closest('table');
    if (table) {
        const grandTotalCell = table.querySelector(`.grand-total-cell[data-teacher="${teacher}"]`);
        const hsaCell = table.querySelector(`.hsa-cell[data-teacher="${teacher}"]`);

        // La pondération 1,25 dépend de l'apport : on recalcule tous les totaux
        refreshDisciplineTotals(table, dataStore[disc], disc);
    }
}

function toggleLockService(disc, sIndex, buttonEl) {
    const service = dataStore[disc].services[sIndex];
    service.locked = !service.locked;

    const isLocked = service.locked;
    buttonEl.className = `lock-btn-icon ${isLocked ? 'locked' : ''}`;
    buttonEl.textContent = isLocked ? '🔒' : '🔓';
    buttonEl.title = isLocked ? "Saisie verrouillée (cliquer pour déverrouiller)" : "Saisie libre (cliquer pour verrouiller)";

    const tr = buttonEl.closest('tr');
    if (tr) {
        const levelSelect = tr.querySelector('.level-select');
        const nameInput = tr.querySelector('.name-input');
        const classesInput = tr.querySelector('.classes-input');
        const hoursInput = tr.querySelector('.hours-input');
        const speCheckbox = tr.querySelector('.spe-checkbox');
        const optCheckbox = tr.querySelector('.opt-checkbox');
        const coEnsCheckbox = tr.querySelector('.coens-checkbox');

        if (levelSelect) levelSelect.disabled = isLocked;
        if (nameInput) nameInput.disabled = isLocked;
        if (classesInput) classesInput.disabled = isLocked;
        if (hoursInput) hoursInput.disabled = isLocked;
        if (speCheckbox) speCheckbox.disabled = isLocked;
        if (optCheckbox) optCheckbox.disabled = isLocked;
        if (coEnsCheckbox) coEnsCheckbox.disabled = isLocked;
    }
}

// Verrouillage en masse : tout verrouiller, sauf si tout l'est déjà (alors tout déverrouiller)
function toggleLockAllServices(disc) {
    const list = dataStore[disc].services || [];
    if (!list.length) return;
    const lock = !list.every(sv => sv.locked);
    list.forEach(sv => { sv.locked = lock; });
    renderApp();
}

function updateService(disc, sIndex, key, value, inputEl) {
    dataStore[disc].services[sIndex][key] = value;
    updateNorvegienBar();
    if (key === 'level' && !dataStore[disc].services[sIndex].isOptionnel) {
        dataStore[disc].services[sIndex].levels = [value];
    }

    if (key === 'isSpecialite' || key === 'isOptionnel') {
        updateSpecialiteButtonVisibility();
    }
    if (key === 'classes') syncServiceSitesWithClasses(dataStore[disc].services[sIndex]);
    if (key === 'level' && inputEl) {
        const ni = inputEl.closest('tr') && inputEl.closest('tr').querySelector('.name-input');
        if (ni) { const id = n1ListId(value); if (id) ni.setAttribute('list', id); else ni.removeAttribute('list'); }
    }

    if (inputEl) {
        if (key === 'level') {
            autoAdjustLevelSelect(inputEl);
        }

        const tr = inputEl.closest('tr');
        if (tr) {
            const classesInput = tr.querySelector('.classes-input');
            const hoursInput = tr.querySelector('.hours-input');

            const classes = parseFloat(classesInput ? classesInput.value : 0) || 0;
            const hours = parseFloat(hoursInput ? hoursInput.value : 0) || 0;
            const targetVolume = classes * hours;

            const targetCellBadge = tr.querySelector('.service-target-badge');
            if (targetCellBadge) {
                targetCellBadge.textContent = `${targetVolume.toFixed(1)} h`;

                const service = dataStore[disc].services[sIndex];
                let currentAllocated = 0;
                Object.values(service.allocations || {}).forEach(v => {
                    currentAllocated += parseFloat(v) || 0;
                });

                const isBalanced = Math.abs(currentAllocated - targetVolume) < 0.01 && targetVolume > 0;
                targetCellBadge.className = `badge service-target-badge ${isBalanced ? 'success' : 'danger'}`;
            }
        }
    } else {
        renderApp();
    }
}

function updateAllocation(anchorDisc, sIndex, teacher, value, inputEl, viewDisc) {
    const val = value === '' ? 0 : parseFloat(value);
    const service = dataStore[anchorDisc].services[sIndex];
    service.allocations[teacher] = val;

    const table = inputEl.closest('table');
    if (!table) return;

    const disc = viewDisc || anchorDisc;
    const data = dataStore[disc];

    const tr = inputEl.closest('tr');
    if (tr) {
        const classesInput = tr.querySelector('.classes-input');
        const hoursInput = tr.querySelector('.hours-input');
        const classes = classesInput ? (parseFloat(classesInput.value) || 0) : (service.classes || 0);
        const hours = hoursInput ? (parseFloat(hoursInput.value) || 0) : (service.hours || 0);
        const targetVolume = classes * hours;

        let currentAllocated = 0;
        Object.values(service.allocations || {}).forEach(v => {
            currentAllocated += parseFloat(v) || 0;
        });

        const targetCellBadge = tr.querySelector('.service-target-badge');
        if (targetCellBadge) {
            const isBalanced = Math.abs(currentAllocated - targetVolume) < 0.01 && targetVolume > 0;
            targetCellBadge.className = `badge service-target-badge ${isBalanced ? 'success' : 'danger'}`;
        }
    }

    refreshDisciplineTotals(table, data, disc);
}

// ── Pastilles déplaçables (position mémorisée dans le navigateur, double-clic pour replacer) ──
const PILL_KEY = 'vectis.pills.v1';
function pillLoad() { try { return JSON.parse(localStorage.getItem(PILL_KEY) || '{}') || {}; } catch (e) { return {}; } }
function pillSave(o) { try { localStorage.setItem(PILL_KEY, JSON.stringify(o)); } catch (e) { } }
function pillClamp(el) {
    if (el.style.position !== 'fixed') return;
    const w = el.offsetWidth, h = el.offsetHeight;
    el.style.left = Math.min(Math.max(0, parseFloat(el.style.left) || 0), Math.max(0, window.innerWidth - w)) + 'px';
    el.style.top = Math.min(Math.max(0, parseFloat(el.style.top) || 0), Math.max(0, window.innerHeight - Math.min(h, 60))) + 'px';
}
function pillPlace(el, pos) {
    if (!pos) { el.style.position = el.style.left = el.style.top = ''; return; }
    el.style.position = 'fixed'; el.style.left = pos.x + 'px'; el.style.top = pos.y + 'px'; pillClamp(el);
}
function initPillDrag() {
    const saved = pillLoad();
    ['ventBar', 'norvBar'].forEach(id => {
        const el = document.getElementById(id); if (!el) return;
        if (saved[id]) pillPlace(el, saved[id]);
        el.setAttribute('title', (el.getAttribute('title') || '') + ' — glisser pour déplacer, double-clic pour replacer');
        let st = null;
        el.addEventListener('pointerdown', e => {
            if (e.button !== 0 || e.target.closest('button')) return;
            const r = el.getBoundingClientRect();
            st = { x: e.clientX, y: e.clientY, l: r.left, t: r.top, drag: false, id: e.pointerId };
            try { el.setPointerCapture(e.pointerId); } catch (x) { }
        });
        el.addEventListener('pointermove', e => {
            if (!st) return;
            const dx = e.clientX - st.x, dy = e.clientY - st.y;
            if (!st.drag) {
                if (Math.hypot(dx, dy) < 6) return;
                st.drag = true; el.classList.add('dragging');
                el.style.position = 'fixed';
            }
            el.style.left = (st.l + dx) + 'px'; el.style.top = (st.t + dy) + 'px'; pillClamp(el);
        });
        const end = () => {
            if (!st) return;
            if (st.drag) {
                el.classList.remove('dragging'); el._moved = true; setTimeout(() => { el._moved = false; }, 0);
                const o = pillLoad(); o[id] = { x: parseFloat(el.style.left) || 0, y: parseFloat(el.style.top) || 0 }; pillSave(o);
            }
            st = null;
        };
        el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
        el.addEventListener('dblclick', () => { pillPlace(el, null); const o = pillLoad(); delete o[id]; pillSave(o); });
    });
    window.addEventListener('resize', () => ['ventBar', 'norvBar'].forEach(id => { const el = document.getElementById(id); if (el) pillClamp(el); }));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPillDrag); else initPillDrag();

function togglePill(el) {
    if (el._moved) return;
    el.classList.toggle('open');
    setTimeout(() => pillClamp(el), 0);
    const w = document.getElementById('pillWrap');
    if (w) w.classList.toggle('raised', !!w.querySelector('.norv-bar.open'));
}

// Pastilles « Norvégien » (dotation − heures ventilées aux enseignants) et « À ventiler »
// (somme des volumes des services créés, sans ventilation nécessaire), mises à jour en direct
function updateNorvegienBar() {
    const bar = document.getElementById('norvBar'), vbar = document.getElementById('ventBar');
    if (!bar) return;
    const discs = Object.keys(dataStore);
    if (discs.length === 0) { bar.style.display = 'none'; if (vbar) vbar.style.display = 'none'; return; }
    let used = 0, usedRaw = 0, vol = 0, nServ = 0, pondReal = 0, pondEst = 0, areTot = 0;
    const pondOn = pondEnabled();
    discs.forEach(d => {
        const gt = getDisciplineTotals(d); used += gt.grand; usedRaw += gt.raw; pondReal += gt.pond; areTot += gt.are;
        (dataStore[d].services || []).forEach(sv => {
            const v = (parseFloat(sv.classes) || 0) * (parseFloat(sv.hours) || 0);
            vol += v; nServ++;
            if (pondOn && sv.ponderationActive) {
                let al = 0; Object.values(sv.allocations || {}).forEach(x => { al += parseFloat(x) || 0; });
                pondEst += Math.max(0, v - al) * ((sv.ponderationFactor || 1.1) - 1);
            }
        });
    });
    const pondTot = pondReal + pondEst, ventTot = vol + pondTot + areTot;
    const dgh = (parseFloat(dotationGlobal.hp) || 0) + (parseFloat(dotationGlobal.hsa) || 0);
    const norv = dgh - used;
    const f = v => v.toFixed(2).replace('.', ',');
    const cls = Math.abs(norv) < 0.005 ? 'zero' : (norv > 0 ? 'ok' : 'over');
    const open = bar.classList.contains('open');
    bar.className = 'norv-bar norv-' + cls + (open ? ' open' : '');
    const pct = dgh > 0 ? Math.min(100, Math.max(0, used / dgh * 100)) : 0;
    bar.innerHTML = `<div class="norv-head"><span class="norv-dot"></span><span class="norv-lbl">Norvégien</span><strong class="norv-val">${norv > 0.004 ? '+' : ''}${f(norv)} h</strong></div>
        <div class="norv-detail">
            <div class="norv-track" aria-hidden="true"><i style="width:${pct}%"></i></div>
            <div class="norv-line"><span>Dotation</span><b>${f(dgh)} h</b></div>
            <div class="norv-line"><span>Ventilé</span><b>${f(used)} h</b></div>
            <button type="button" class="norv-link" onclick="event.stopPropagation(); openTrmdModal()">Ouvrir le TRMD ›</button>
        </div>`;
    bar.style.display = 'block';
    if (!vbar) return;
    const rest = dgh - ventTot, vcls = Math.abs(rest) < 0.005 ? 'zero' : (rest > 0 ? 'ok' : 'over');
    const vopen = vbar.classList.contains('open');
    vbar.className = 'norv-bar vent-bar norv-' + vcls + (vopen ? ' open' : '');
    const vpct = dgh > 0 ? Math.min(100, Math.max(0, ventTot / dgh * 100)) : 0;
    const toVent = Math.max(0, vol - usedRaw);
    vbar.innerHTML = `<div class="norv-head"><span class="norv-dot"></span><span class="norv-lbl">À ventiler</span><strong class="norv-val">${f(ventTot)} h</strong></div>
        <div class="norv-detail">
            <div class="norv-track" aria-hidden="true"><i style="width:${vpct}%"></i></div>
            <div class="norv-line"><span>Services créés (${nServ})</span><b>${f(vol)} h</b></div>
            ${pondOn ? `<div class="norv-line" title="Pondérations des heures ventilées + estimation sur les heures non encore ventilées (${f(pondEst)} h)"><span>+ Pondérations</span><b>${f(pondTot)} h</b></div>` : ''}
            <div class="norv-line"><span>+ ARE</span><b>${f(areTot)} h</b></div>
            <div class="norv-line norv-total"><span>Total à ventiler</span><b>${f(ventTot)} h</b></div>
            <div class="norv-line"><span>Dotation</span><b>${f(dgh)} h</b></div>
            <div class="norv-line"><span>Dotation − total</span><b>${rest > 0.004 ? '+' : ''}${f(rest)} h</b></div>
            <div class="norv-line"><span>Heures de services déjà ventilées</span><b>${f(usedRaw)} h</b></div>
            <div class="norv-line"><span>Heures de services restantes</span><b>${f(toVent)} h</b></div>
            ${pondOn && pondEst > 0.004 ? `<div class="norv-note">Pondérations : dont ${f(pondEst)} h estimées sur les heures non ventilées.</div>` : ''}
            <button type="button" class="norv-link" onclick="event.stopPropagation(); openTrmdModal()">Ouvrir le TRMD ›</button>
        </div>`;
    vbar.style.display = 'block';
}

function refreshDisciplineTotals(table, data, disc) {
    updateNorvegienBar();
    const teacherTotalsRaw = {};
    const teacherTotalsPond = {};
    const teacher11RawSums = {};

    data.teachers.forEach(t => {
        teacherTotalsRaw[t] = 0;
        teacherTotalsPond[t] = 0;
        teacher11RawSums[t] = 0;
    });

    const allVisibleServices = data.services.concat(
        getCrossListedOptions(disc).map(row => row.service)
    );

    allVisibleServices.forEach(s => {
        const baseVolume = (s.classes || 0) * (s.hours || 0);
        const factor = s.ponderationActive ? (s.ponderationFactor || 1.1) : 1;

        data.teachers.forEach(t => {
            const tVal = parseFloat(s.allocations[t]) || 0;
            teacherTotalsRaw[t] += tVal;

            teacher11RawSums['raw:' + t] = (teacher11RawSums['raw:' + t] || 0) + tVal;

            if (s.ponderationActive && tVal > 0) {
                if (Math.abs(factor - 1.25) < 0.01) {
                    teacher11RawSums['125:' + t] = (teacher11RawSums['125:' + t] || 0) + tVal;
                } else if (Math.abs(factor - 1.1) < 0.01) {
                    teacher11RawSums[t] += tVal * 0.1;
                } else {
                    teacher11RawSums['x:' + t] = teacher11RawSums['x:' + t] || {};
                    teacher11RawSums['x:' + t][factor] = (teacher11RawSums['x:' + t][factor] || 0) + tVal;
                }
            }
        });
    });

    data.teachers.forEach(t => {
        teacherTotalsPond[t] += pondExtra(teacher11RawSums, t, data);
    });

    data.teachers.forEach(t => {
        const rawCell = table.querySelector(`.raw-total-cell[data-teacher="${t}"]`);
        if (rawCell) {
            rawCell.textContent = fmtHours(teacherTotalsRaw[t], data, false, 1);
        }

        const pondCell = table.querySelector(`.pond-total-cell[data-teacher="${t}"]`);
        if (pondCell) {
            pondCell.textContent = fmtHours(teacherTotalsPond[t], data, false, 2);
        }

        const grandTotal = teacherTotalsRaw[t] + teacherTotalsPond[t] + areTotal(data, t);
        const grandTotalCell = table.querySelector(`.grand-total-cell[data-teacher="${t}"]`);
        if (grandTotalCell) {
            grandTotalCell.dataset.grandtotal = grandTotal;
            grandTotalCell.textContent = fmtHours(grandTotal, data, false, 2);
        }

        const hsaCell = table.querySelector(`.hsa-cell[data-teacher="${t}"]`);
        if (hsaCell) {
            const apportVal = data.apports[t] !== undefined ? data.apports[t] : 18;
            const hsaVal = grandTotal - apportVal;
            const badgeClass = hsaVal >= 0 ? 'success' : 'danger';
            hsaCell.innerHTML = `<span class="badge ${badgeClass}">${fmtHours(hsaVal, data, true, 2)}</span>`;
        }
    });

    refreshCellPonds(table, data, disc);
    const scope = table.closest('.tab-content') || document;
    scope.querySelectorAll('.disc-summary').forEach(el => { el.innerHTML = buildDisciplineSummaryHtml(el.dataset.disc); });
}

function getCrossListedOptions(disc) {
    const result = [];
    Object.keys(dataStore).forEach(otherDisc => {
        if (otherDisc === disc) return;
        (dataStore[otherDisc].services || []).forEach((s, i) => {
            if (s.isOptionnel && Array.isArray(s.assignedDisciplines) && s.assignedDisciplines.includes(disc)) {
                result.push({ anchorDisc: otherDisc, sIndex: i, service: s });
            }
        });
    });
    return result;
}

function createTable(disc) {
    const data = dataStore[disc];
    if (!data.apports) data.apports = {};

    const container = document.createElement('div');
    container.className = 'table-container';

    const table = document.createElement('table');

    const sortCols = [
        { key: 'level', label: 'Niveau' },
        { key: 'name', label: 'Intitulé Service / Matière' },
        { key: 'classes', label: 'Nbr. Classe' },
        { key: 'hours', label: 'Vol. Classe' },
        ...(pondEnabled() ? [{ key: 'ponderation', label: 'Pondération' }] : []),
        { key: 'target', label: 'À ventiler' }
    ];

    let theadHtml = `<thead><tr>`;

    sortCols.forEach(col => {
        const isSorted = data.sortCol === col.key;
        const icon = isSorted ? (data.sortAsc ? '▲' : '▼') : '↕';
        const sortedClass = isSorted ? 'sorted' : '';
        theadHtml += `
            <th class="sortable ${sortedClass}" onclick="handleSort('${disc}', '${col.key}')">
                ${col.label} <span class="sort-icon">${icon}</span>
            </th>
        `;
        if (col.key === 'name') {
            theadHtml += `<th style="text-align: center; width: 150px;">Horaire plancher (h)</th>`;
        }
    });
    
    data.teachers.forEach((t, tIndex) => {
        const deleteColBtn = data.deleteMode 
            ? `<button class="delete-btn-icon" title="Supprimer cet enseignant" onclick="deleteTeacher('${disc}', ${tIndex})">✕</button><button class="edit-btn-icon" title="Modifier le nom de cet enseignant" onclick="renameTeacher('${disc}', ${tIndex})">✎</button>` 
            : '';
        const currentApport = data.apports[t] !== undefined ? data.apports[t] : 18;

        theadHtml += `
            <th draggable="true" 
                ondragstart="handleDragStart('${disc}', ${tIndex}, event)"
                ondragover="handleDragOver(event)"
                ondragleave="handleDragLeave(event)"
                ondrop="handleDrop('${disc}', ${tIndex}, event)"
                class="draggable-teacher"
                title="Glisser-déposer pour réordonner"
                style="text-align: center;">
                <div class="teacher-header-box">
                    <div class="teacher-header-title">${deleteColBtn}⋮ ${t}</div>
                    <div class="apport-input-wrapper">
                        <label>ORS :</label>
                        <input type="number" step="0.5" min="0" value="${currentApport}" 
                            oninput="updateApport('${disc}', '${t.replace(/'/g, "\\'")}', this.value, this)">
                    </div>
                    <button type="button" class="teacher-view-btn" title="Voir les services de cet enseignant" draggable="false" onclick="openTeacherServicesModal('${disc.replace(/'/g, "\\'")}', ${tIndex})">👁 Services</button>
                </div>
            </th>
        `;
    });
    theadHtml += `</tr></thead>`;

    let tbodyHtml = '<tbody>';
    const teacherTotalsRaw = {};
    const teacherTotalsPond = {};
    const teacher11RawSums = {};

    data.teachers.forEach(t => {
        teacherTotalsRaw[t] = 0;
        teacherTotalsPond[t] = 0;
        teacher11RawSums[t] = 0;
    });

    const globalSpeEnabled = epleIdentity.enableSpecialites || false;
    const discSpeEnabled = data.enableSpecialites || false;

    const globalOptEnabled = epleIdentity.enableOptionnels || false;
    const discOptEnabled = data.enableOptionnels || false;

    const globalCoEnsEnabled = epleIdentity.enableCoEnseignement || false;
    const discCoEnsEnabled = data.enableCoEnseignement || false;

    const globalMultiEnabled = epleIdentity.enableMultiNiveau || false;
    const discMultiEnabled = data.enableMultiNiveau || false;

    const buildServiceRow = (service, anchorDisc, sIndex, crossListed) => {
        const baseVolume = (service.classes || 0) * (service.hours || 0);
        const factor = service.ponderationActive ? (service.ponderationFactor || 1.1) : 1;
        const targetVolume = baseVolume;

        let currentAllocated = 0;
        Object.values(service.allocations || {}).forEach(v => {
            currentAllocated += parseFloat(v) || 0;
        });

        data.teachers.forEach(t => {
            const val = parseFloat(service.allocations[t]) || 0;
            teacherTotalsRaw[t] += val;

            teacher11RawSums['raw:' + t] = (teacher11RawSums['raw:' + t] || 0) + val;

            if (service.ponderationActive && val > 0) {
                if (Math.abs(factor - 1.25) < 0.01) {
                    teacher11RawSums['125:' + t] = (teacher11RawSums['125:' + t] || 0) + val;
                } else if (Math.abs(factor - 1.1) < 0.01) {
                    teacher11RawSums[t] += val * 0.1;
                } else {
                    teacher11RawSums['x:' + t] = teacher11RawSums['x:' + t] || {};
                    teacher11RawSums['x:' + t][factor] = (teacher11RawSums['x:' + t][factor] || 0) + val;
                }
            }
        });

        const isLocked = service.locked || false;
        const isSpe = service.isSpecialite || false;
        const isOpt = service.isOptionnel || false;
        const isCoEns = service.isCoEnseignement || false;
        const rawLineSurplus = service.ponderationActive ? baseVolume * (factor - 1) : 0;

        const isBalanced = Math.abs(currentAllocated - targetVolume) < 0.01 && targetVolume > 0;
        const badgeClass = isBalanced ? 'success' : 'danger';

        const deleteRowBtn = data.deleteMode 
            ? `<button class="delete-btn-icon" title="Supprimer ce service" onclick="deleteService('${anchorDisc}', ${sIndex})">✕</button>` 
            : '';

        let speTagHtml = '';
        if (globalSpeEnabled) {
            if (discSpeEnabled) {
                speTagHtml = `
                    <label class="checkbox-container" title="Cocher s'il s'agit d'un cours de spécialité" style="font-size: 0.75rem; font-weight: 600; color: var(--purple-text); background: var(--purple-bg); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--purple-border);">
                        <input type="checkbox" class="spe-checkbox" ${isSpe ? 'checked' : ''} ${isLocked ? 'disabled' : ''} onchange="updateService('${anchorDisc}', ${sIndex}, 'isSpecialite', this.checked, this)">
                        Spé
                    </label>
                `;
            } else if (isSpe) {
                speTagHtml = `
                    <span style="font-size: 0.75rem; font-weight: 700; color: var(--purple-text); background: var(--purple-bg); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--purple-border);">
                        Spé
                    </span>
                `;
            }
        }

        let optTagHtml = '';
        if (globalOptEnabled) {
            if (discOptEnabled) {
                optTagHtml = `
                    <label class="checkbox-container" title="Cocher s'il s'agit d'un enseignement optionnel" style="font-size: 0.75rem; font-weight: 600; color: var(--teal-text); background: var(--teal-bg); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--teal-border);">
                        <input type="checkbox" class="opt-checkbox" ${isOpt ? 'checked' : ''} ${isLocked ? 'disabled' : ''} onchange="updateService('${anchorDisc}', ${sIndex}, 'isOptionnel', this.checked, this)">
                        Opt
                    </label>
                `;
            } else if (isOpt) {
                optTagHtml = `
                    <span style="font-size: 0.75rem; font-weight: 700; color: var(--teal-text); background: var(--teal-bg); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--teal-border);">
                        Opt
                    </span>
                `;
            }
        }

        let coEnsTagHtml = '';
        if (globalCoEnsEnabled) {
            if (discCoEnsEnabled) {
                coEnsTagHtml = `
                    <label class="checkbox-container" title="Cocher s'il s'agit d'un service en co-enseignement" style="font-size: 0.75rem; font-weight: 600; color: var(--amber-text); background: var(--amber-bg); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--amber-border);">
                        <input type="checkbox" class="coens-checkbox" ${isCoEns ? 'checked' : ''} ${isLocked ? 'disabled' : ''} onchange="updateService('${anchorDisc}', ${sIndex}, 'isCoEnseignement', this.checked, this)">
                        Co-E
                    </label>
                `;
            } else if (isCoEns) {
                coEnsTagHtml = `
                    <span style="font-size: 0.75rem; font-weight: 700; color: var(--amber-text); background: var(--amber-bg); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--amber-border);">
                        Co-E
                    </span>
                `;
            }
        }

        const isMulti = service.isMultiNiveau || false;
        let multiTagHtml = '';
        if (globalMultiEnabled) {
            if (discMultiEnabled) {
                multiTagHtml = `
                    <label class="checkbox-container" title="Cocher pour rattacher ce service à plusieurs niveaux à la fois" style="font-size: 0.75rem; font-weight: 600; color: var(--indigo-text); background: var(--indigo-bg); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--indigo-border);">
                        <input type="checkbox" class="multi-checkbox" ${isMulti ? 'checked' : ''} ${isLocked ? 'disabled' : ''} onchange="updateService('${anchorDisc}', ${sIndex}, 'isMultiNiveau', this.checked, null)">
                        Multi
                    </label>
                `;
            } else if (isMulti) {
                multiTagHtml = `
                    <span style="font-size: 0.75rem; font-weight: 700; color: var(--indigo-text); background: var(--indigo-bg); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--indigo-border);">
                        Multi
                    </span>
                `;
            }
        }

        let linkedDiscBadgeHtml = '';
        if (isOpt && Array.isArray(service.assignedDisciplines) && service.assignedDisciplines.length > 1) {
            const otherDiscs = service.assignedDisciplines.filter(d => d !== disc);
            if (otherDiscs.length > 0) {
                linkedDiscBadgeHtml = `
                    <span title="Ce service est également rattaché à ${otherDiscs.join(', ')}" style="font-size: 0.75rem; font-weight: 600; color: var(--teal-text); background: var(--teal-bg); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--teal-border); white-space: nowrap;">
                        🔗 ${otherDiscs.join(', ')}
                    </span>
                `;
            }
        }

        let levelCellHtml;
        if (isOpt || isMulti) {
            if (!service.levels) service.levels = service.level ? [service.level] : [];
            const levelsDisplay = service.levels.length > 0 ? service.levels.join(', ') : 'Choisir...';
            levelCellHtml = `
                <div class="multi-select-box">
                    <button type="button" class="multi-select-btn" ${isLocked ? 'disabled' : ''} onclick="toggleMultiSelectDropdown(this)">
                        <span>${levelsDisplay}</span>
                        <span style="font-size: 0.65rem; color: var(--text-muted);">▼</span>
                    </button>
                    <div class="multi-select-dropdown">
                        ${levels.map(l => `
                            <label class="multi-select-item">
                                <input type="checkbox" ${service.levels.includes(l) ? 'checked' : ''} onchange="toggleOptLevelSelection('${anchorDisc}', ${sIndex}, '${l.replace(/'/g, "\\'")}')">
                                ${l}
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        } else {
            levelCellHtml = `
                <select class="level-select" ${isLocked ? 'disabled' : ''} onchange="updateService('${anchorDisc}', ${sIndex}, 'level', this.value, this)">
                    ${levels.map(l => `<option value="${l}" ${service.level === l ? 'selected' : ''}>${l}</option>`).join('')}
                </select>
            `;
        }

        const baseHourLevels = getServiceLevels(service);
        const firstBaseHourLevel = baseHourLevels[0] || service.level || '';
        const firstBhKey = getBaseHourKey(firstBaseHourLevel, service.name || '');
        const baseHourVal = baseHoursStore[firstBhKey] !== undefined ? baseHoursStore[firstBhKey] : '';
        const horairePlancherCellHtml = `
            <input type="number" min="0" step="0.5" value="${baseHourVal}" placeholder="0" ${isLocked ? 'disabled' : ''}
                onchange="updateServiceBaseHourAllLevels('${anchorDisc}', ${sIndex}, this.value)">
        `;

        let rowHtml = `
            <tr>
                <td style="${siteRowStyle(service)}">
                    <div style="display: flex; align-items: center; gap: 4px;">
                        ${deleteRowBtn}
                        <button class="lock-btn-icon ${isLocked ? 'locked' : ''}" 
                            title="${isLocked ? 'Saisie verrouillée (cliquer pour déverrouiller)' : 'Saisie libre (cliquer pour verrouiller)'}" 
                            onclick="toggleLockService('${anchorDisc}', ${sIndex}, this)">
                            ${isLocked ? '🔒' : '🔓'}
                        </button>
                        ${levelCellHtml}
                    </div>
                </td>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <input type="text" class="name-input" placeholder="Saisir l'intitulé…" value="${service.name}" ${n1ListAttr(service.level)} ${isLocked ? 'disabled' : ''} onchange="updateService('${anchorDisc}', ${sIndex}, 'name', this.value, null)">
                        ${speTagHtml}
                        ${optTagHtml}
                        ${coEnsTagHtml}
                        ${multiTagHtml}
                        ${linkedDiscBadgeHtml}
                    </div>
                </td>
                <td style="text-align: center;">
                    ${horairePlancherCellHtml}
                </td>
                <td>
                    <input type="number" class="classes-input" min="0" step="0.5" value="${service.classes}" ${isLocked ? 'disabled' : ''} oninput="updateService('${anchorDisc}', ${sIndex}, 'classes', parseFloat(this.value)||0, this)">
                </td>
                <td>
                    <input type="number" class="hours-input" min="0" step="0.5" value="${service.hours}" ${isLocked ? 'disabled' : ''} oninput="updateService('${anchorDisc}', ${sIndex}, 'hours', parseFloat(this.value)||0, this)">
                </td>
                ${pondEnabled() ? `                <td>
                    <div class="checkbox-container">
                        <input type="checkbox" ${service.ponderationActive ? 'checked' : ''} ${isLocked ? 'disabled' : ''}
                            onchange="updateService('${anchorDisc}', ${sIndex}, 'ponderationActive', this.checked, null)">
                        <input type="number" step="0.05" min="1" value="${service.ponderationFactor || 1.1}" 
                            style="width: 60px;" ${(!service.ponderationActive || isLocked) ? 'disabled' : ''}
                            onchange="updateService('${anchorDisc}', ${sIndex}, 'ponderationFactor', parseFloat(this.value)||1, null)">
                    </div>
                    ${service.ponderationActive ? `<div class="ponderation-box">+${rawLineSurplus.toFixed(2)}h pond.</div>` : ''}
                </td>
` : ''}
                <td style="text-align: center;">
                    <span class="badge service-target-badge ${badgeClass}">${targetVolume.toFixed(1)} h</span>
                </td>
        `;

        data.teachers.forEach(t => {
            const val = service.allocations[t] !== undefined ? service.allocations[t] : '';
            const numVal = parseFloat(val) || 0;
            let coEnsBadgesHtml = '';
            if (numVal > 0 && service.isCoEnseignement) {
                const partners = getCoEnseignementPartnersForRow(anchorDisc, sIndex, t);
                if (partners.length > 0) {
                    coEnsBadgesHtml = `<div style="display: flex; flex-direction: column; align-items: center; gap: 3px; margin-top: 3px;">${buildCoEnsPartnerBadgesHtml(partners)}</div>`;
                }
            }
            rowHtml += `
                <td class="teacher-cell">
                    <input type="number" min="0" step="0.5" value="${val}" 
                        oninput="updateAllocation('${anchorDisc}', ${sIndex}, '${t.replace(/'/g, "\\'")}', this.value, this, '${disc.replace(/'/g, "\\'")}')">
                    ${pondEnabled() ? `<div class="cell-pond" data-anchor="${anchorDisc.replace(/"/g, '&quot;')}" data-sidx="${sIndex}" data-teacher="${t.replace(/"/g, '&quot;')}"></div>` : ''}
                    ${coEnsBadgesHtml}
                </td>
            `;
        });

        rowHtml += `</tr>`;
        return rowHtml;
    };

    data.services.forEach((service, sIndex) => {
        tbodyHtml += buildServiceRow(service, disc, sIndex, false);
    });

    const crossListedRows = getCrossListedOptions(disc);
    crossListedRows.forEach(row => {
        tbodyHtml += buildServiceRow(row.service, row.anchorDisc, row.sIndex, true);
    });

    data.teachers.forEach(t => {
        teacherTotalsPond[t] += pondExtra(teacher11RawSums, t, data);
    });

    let tfootHtml = '<tfoot>';
    
    const fixedCols = pondEnabled() ? 7 : 6;
    tfootHtml += `<tr class="totals-row"><td colspan="${fixedCols}">Total des heures attribuées</td>`;
    data.teachers.forEach(t => {
        tfootHtml += `<td class="raw-total-cell" data-teacher="${t}">${fmtHours(teacherTotalsRaw[t], data, false, 1)}</td>`;
    });
    tfootHtml += '</tr>';

    if (pondEnabled()) {
    tfootHtml += '<tr class="totals-row"><td colspan="7">Pondérations <button type="button" class="pond-info-btn" title="Voir les paramètres de calcul des pondérations" onclick="openPondInfoModal()">i</button></td>';
    data.teachers.forEach(t => {
        tfootHtml += `<td class="pond-total-cell" data-teacher="${t}">${fmtHours(teacherTotalsPond[t], data, false, 2)}</td>`;
    });
    tfootHtml += '</tr>';
    }

    tfootHtml += `<tr class="totals-row grand-total"><td colspan="${fixedCols}">Total des heures (${pondEnabled() ? 'brut + pondération + ARE' : 'brut + ARE'})</td>`;
    data.teachers.forEach(t => {
        const grandTotal = teacherTotalsRaw[t] + teacherTotalsPond[t] + areTotal(data, t);
        tfootHtml += `<td class="grand-total-cell" data-teacher="${t}" data-grandtotal="${grandTotal}">${fmtHours(grandTotal, data, false, 2)}</td>`;
    });
    tfootHtml += '</tr>';

    tfootHtml += `<tr class="totals-row hsa-row"><td colspan="${fixedCols}">HSA (Total général - ORS)</td>`;
    data.teachers.forEach(t => {
        const grandTotal = teacherTotalsRaw[t] + teacherTotalsPond[t] + areTotal(data, t);
        const apportVal = data.apports[t] !== undefined ? data.apports[t] : 18;
        const hsaVal = grandTotal - apportVal;

        const badgeClass = hsaVal >= 0 ? 'success' : 'danger';
        tfootHtml += `<td class="hsa-cell" data-teacher="${t}">
            <span class="badge ${badgeClass}">${fmtHours(hsaVal, data, true, 2)}</span>
        </td>`;
    });
    tfootHtml += '</tr>';

    tfootHtml += `<tr class="totals-row are-row"><td colspan="${fixedCols}">ARE (allègements / missions)</td>`;
    data.teachers.forEach(t => {
        tfootHtml += `<td class="are-cell" data-teacher="${escapeStructureHtml(t)}">${buildAreCellHtml(disc, t)}</td>`;
    });
    tfootHtml += '</tr>';

    // Rappel du nom des enseignants, affiché sous la ligne HSA quand l'en-tête n'est plus visible
    tfootHtml += `<tr class="teacher-name-row"><td colspan="${fixedCols}"></td>`;
    data.teachers.forEach(t => {
        tfootHtml += `<td class="teacher-name-cell">${escapeStructureHtml(t)}</td>`;
    });
    tfootHtml += '</tr></tfoot>';

    tbodyHtml += '</tbody>';
    table.innerHTML = theadHtml + tbodyHtml + tfootHtml;
    refreshCellPonds(table, data, disc);
    container.appendChild(table);

    return container;
}

function openTrmdModal() {
    renderTrmdContent();
    document.getElementById('trmdModal').classList.add('active');
}

function renderTrmdContent() {
    const container = document.getElementById('trmdContent');
    const disciplines = Object.keys(dataStore);

    let grandHP = 0;
    let grandRaw = 0;
    let grandHsa = 0;
    let grandEpleTotalGeneral = 0;
    let grandTeachersCount = 0;

    disciplines.forEach(disc => {
        const data = dataStore[disc];
        if (!data.apports) data.apports = {};
        grandTeachersCount += data.teachers.length;
        grandHP += getDisciplineHP(disc);

        const teacherPond11Sums = {};
        const teacherRawTotals = {};
        data.teachers.forEach(t => {
            teacherPond11Sums[t] = 0;
            teacherRawTotals[t] = 0;
        });

        const allServicesForTeacherCredit = data.services.concat(
            getCrossListedOptions(disc).map(row => row.service)
        );

        allServicesForTeacherCredit.forEach(service => {
            const factor = service.ponderationActive ? (service.ponderationFactor || 1.1) : 1;

            data.teachers.forEach(t => {
                const val = parseFloat(service.allocations[t]) || 0;
                grandRaw += val;
                teacherRawTotals[t] += val;

                teacherPond11Sums['raw:' + t] = (teacherPond11Sums['raw:' + t] || 0) + val;

                if (service.ponderationActive && val > 0) {
                    if (Math.abs(factor - 1.25) < 0.01) {
                        teacherPond11Sums['125:' + t] = (teacherPond11Sums['125:' + t] || 0) + val;
                    } else if (Math.abs(factor - 1.1) < 0.01) {
                        teacherPond11Sums[t] += val * 0.1;
                    } else {
                        teacherPond11Sums['x:' + t] = teacherPond11Sums['x:' + t] || {};
                        teacherPond11Sums['x:' + t][factor] = (teacherPond11Sums['x:' + t][factor] || 0) + val;
                    }
                }
            });
        });

        data.teachers.forEach(t => {
            const grandTotalTeacher = teacherRawTotals[t] + pondExtra(teacherPond11Sums, t, data) + areTotal(data, t);
            const apportVal = data.apports[t] !== undefined ? data.apports[t] : 18;
            grandHsa += (grandTotalTeacher - apportVal);
            grandEpleTotalGeneral += grandTotalTeacher;
        });
    });

    const totalDgh = (dotationGlobal.hp || 0) + (dotationGlobal.hsa || 0);
    const norvegien = totalDgh - grandEpleTotalGeneral;
    const norvegienClass = norvegien >= 0 ? 'success' : 'danger';

    const epleSubtitleHtml = epleIdentity && epleIdentity.name 
        ? `<div class="pdf-subtitle">${epleIdentity.name} ${epleIdentity.commune ? '— ' + epleIdentity.commune : ''} ${epleIdentity.uai ? '(' + epleIdentity.uai + ')' : ''}</div>`
        : `<div class="pdf-subtitle" style="font-style: italic; color: #94a3b8;">Aucun établissement sélectionné</div>`;

    let html = `
        <div class="pdf-title">Tableau de Répartition des Moyens par Discipline</div>
        ${epleSubtitleHtml}
        
        <div class="dotation-panel">
            <div class="dotation-field">
                <label for="inputHP">Heures Poste (HP) :</label>
                <input type="number" id="inputHP" step="0.5" min="0" value="${dotationGlobal.hp}" onchange="updateDotation('hp', parseFloat(this.value)||0)">
            </div>
            <div class="dotation-field">
                <label for="inputHSA">HSA :</label>
                <input type="number" id="inputHSA" step="0.5" min="0" value="${dotationGlobal.hsa}" onchange="updateDotation('hsa', parseFloat(this.value)||0)">
            </div>
            <div class="dotation-summary-item">
                <strong>DGH totale :</strong> ${totalDgh.toFixed(1)} h
            </div>
            <div class="dotation-summary-item">
                <strong>Norvégien :</strong> 
                <span class="badge ${norvegienClass}" style="margin-left: 4px;">${norvegien > 0 ? '+' : ''}${norvegien.toFixed(2)} h</span>
            </div>
        </div>
    `;

    if (disciplines.length === 0) {
        html += '<p class="empty-state">Aucune donnée disponible.</p>';
    } else {
        html += `
            <table>
                <thead>
                    <tr>
                        <th>Discipline</th>
                        <th style="text-align: center;">Nb Ens.</th>
                        <th style="text-align: center;">HP (ORS)</th>
                        <th style="text-align: center;">Volume ventilé</th>
                        <th style="text-align: center;">HSA</th>
                        <th style="text-align: center;">Total (${totalLabelSuffix()})</th>
                    </tr>
                </thead>
                <tbody>
        `;

        disciplines.forEach(disc => {
            const data = dataStore[disc];
            if (!data.apports) data.apports = {};
            let allocatedRaw = 0;
            let discHsaTotal = 0;
            let discGrandTotal = 0;

            const teacherPond11Sums = {};
            const teacherRawTotals = {};
            data.teachers.forEach(t => {
                teacherPond11Sums[t] = 0;
                teacherRawTotals[t] = 0;
            });

            const allServicesForTeacherCredit = data.services.concat(
                getCrossListedOptions(disc).map(row => row.service)
            );

            allServicesForTeacherCredit.forEach(service => {
                const factor = service.ponderationActive ? (service.ponderationFactor || 1.1) : 1;

                data.teachers.forEach(t => {
                    const val = parseFloat(service.allocations[t]) || 0;
                    allocatedRaw += val;
                    teacherRawTotals[t] += val;

                    teacherPond11Sums['raw:' + t] = (teacherPond11Sums['raw:' + t] || 0) + val;

                    if (service.ponderationActive && val > 0) {
                        if (Math.abs(factor - 1.25) < 0.01) {
                            teacherPond11Sums['125:' + t] = (teacherPond11Sums['125:' + t] || 0) + val;
                        } else if (Math.abs(factor - 1.1) < 0.01) {
                            teacherPond11Sums[t] += val * 0.1;
                        } else {
                            teacherPond11Sums['x:' + t] = teacherPond11Sums['x:' + t] || {};
                            teacherPond11Sums['x:' + t][factor] = (teacherPond11Sums['x:' + t][factor] || 0) + val;
                        }
                    }
                });
            });

            data.teachers.forEach(t => {
                const grandTotalTeacher = teacherRawTotals[t] + pondExtra(teacherPond11Sums, t, data) + areTotal(data, t);
                const apportVal = data.apports[t] !== undefined ? data.apports[t] : 18;
                discHsaTotal += (grandTotalTeacher - apportVal);
                discGrandTotal += grandTotalTeacher;
            });

            const hsaBadgeClass = discHsaTotal >= 0 ? 'success' : 'danger';

            html += `
                <tr>
                    <td><strong>${disc}</strong></td>
                    <td style="text-align: center;">${data.teachers.length}</td>
                    <td style="text-align: center;">${getDisciplineHP(disc).toFixed(1)} h</td>
                    <td style="text-align: center;">${allocatedRaw.toFixed(1)} h</td>
                    <td style="text-align: center;">
                        <span class="badge ${hsaBadgeClass}">${discHsaTotal > 0 ? '+' : ''}${discHsaTotal.toFixed(2)} h</span>
                    </td>
                    <td style="text-align: center;"><strong>${discGrandTotal.toFixed(2)} h</strong></td>
                </tr>
            `;
        });

        const grandHsaBadgeClass = grandHsa >= 0 ? 'success' : 'danger';

        html += `
            </tbody>
            <tfoot>
                <tr class="totals-row grand-total">
                    <td>TOTAL EPLE</td>
                    <td style="text-align: center;">${grandTeachersCount}</td>
                    <td style="text-align: center;">${grandHP.toFixed(1)} h</td>
                    <td style="text-align: center;">${grandRaw.toFixed(1)} h</td>
                    <td style="text-align: center;">
                        <span class="badge ${grandHsaBadgeClass}">${grandHsa > 0 ? '+' : ''}${grandHsa.toFixed(2)} h</span>
                    </td>
                    <td style="text-align: center;"><strong>${grandEpleTotalGeneral.toFixed(2)} h</strong></td>
                </tr>
            </tfoot>
            </table>
        `;
    }

    container.innerHTML = html;
}

function updateDotation(key, value) {
    dotationGlobal[key] = value;
    updateNorvegienBar();
    renderTrmdContent();
}

function buildTrmdSheetData() {
    const disciplines = Object.keys(dataStore);

    let grandHP = 0;
    let grandRaw = 0;
    let grandHsa = 0;
    let grandEpleTotalGeneral = 0;
    let grandTeachersCount = 0;

    const tableRows = [];

    disciplines.forEach(disc => {
        const data = dataStore[disc];
        if (!data.apports) data.apports = {};

        let allocatedRaw = 0;
        let discHsaTotal = 0;
        let discGrandTotal = 0;

        const teacherPond11Sums = {};
        const teacherRawTotals = {};
        data.teachers.forEach(t => {
            teacherPond11Sums[t] = 0;
            teacherRawTotals[t] = 0;
        });

        const allServicesForTeacherCredit = data.services.concat(
            getCrossListedOptions(disc).map(row => row.service)
        );

        allServicesForTeacherCredit.forEach(service => {
            const factor = service.ponderationActive ? (service.ponderationFactor || 1.1) : 1;

            data.teachers.forEach(t => {
                const val = parseFloat(service.allocations[t]) || 0;
                allocatedRaw += val;
                teacherRawTotals[t] += val;

                teacherPond11Sums['raw:' + t] = (teacherPond11Sums['raw:' + t] || 0) + val;

                if (service.ponderationActive && val > 0) {
                    if (Math.abs(factor - 1.25) < 0.01) {
                        teacherPond11Sums['125:' + t] = (teacherPond11Sums['125:' + t] || 0) + val;
                    } else if (Math.abs(factor - 1.1) < 0.01) {
                        teacherPond11Sums[t] += val * 0.1;
                    } else {
                        teacherPond11Sums['x:' + t] = teacherPond11Sums['x:' + t] || {};
                        teacherPond11Sums['x:' + t][factor] = (teacherPond11Sums['x:' + t][factor] || 0) + val;
                    }
                }
            });
        });

        data.teachers.forEach(t => {
            const grandTotalTeacher = teacherRawTotals[t] + pondExtra(teacherPond11Sums, t, data) + areTotal(data, t);
            const apportVal = data.apports[t] !== undefined ? data.apports[t] : 18;
            discHsaTotal += (grandTotalTeacher - apportVal);
            discGrandTotal += grandTotalTeacher;
        });

        grandRaw += allocatedRaw;
        grandHsa += discHsaTotal;
        grandEpleTotalGeneral += discGrandTotal;
        grandTeachersCount += data.teachers.length;
        grandHP += getDisciplineHP(disc);

        tableRows.push([
            disc,
            data.teachers.length,
            parseFloat(getDisciplineHP(disc).toFixed(1)),
            parseFloat(allocatedRaw.toFixed(1)),
            parseFloat(discHsaTotal.toFixed(2)),
            parseFloat(discGrandTotal.toFixed(2))
        ]);
    });

    tableRows.push([
        'TOTAL EPLE',
        grandTeachersCount,
        parseFloat(grandHP.toFixed(1)),
        parseFloat(grandRaw.toFixed(1)),
        parseFloat(grandHsa.toFixed(2)),
        parseFloat(grandEpleTotalGeneral.toFixed(2))
    ]);

    const totalDgh = (dotationGlobal.hp || 0) + (dotationGlobal.hsa || 0);
    const norvegien = totalDgh - grandEpleTotalGeneral;

    const epleSubtitle = epleIdentity && epleIdentity.name
        ? `${epleIdentity.name}${epleIdentity.commune ? ' — ' + epleIdentity.commune : ''}${epleIdentity.uai ? ' (' + epleIdentity.uai + ')' : ''}`
        : 'Aucun établissement sélectionné';

    return [
        ['Tableau de Répartition des Moyens par Discipline'],
        [epleSubtitle],
        [],
        ['Heures Poste (HP)', dotationGlobal.hp || 0],
        ['HSA', dotationGlobal.hsa || 0],
        ['DGH totale (h)', parseFloat(totalDgh.toFixed(1))],
        ['Norvégien (h)', parseFloat(norvegien.toFixed(2))],
        [],
        ['Discipline', 'Nb Ens.', 'HP (ORS) (h)', 'Volume ventilé (h)', 'HSA (h)', `Total (${totalLabelSuffix()}) (h)`],
        ...tableRows
    ];
}

function buildTrmdSheet() {
    const ws = XLSX.utils.aoa_to_sheet(buildTrmdSheetData());
    ws['!cols'] = [
        { wch: 28 }, { wch: 10 }, { wch: 12 }, { wch: 20 }, { wch: 12 }, { wch: 26 }
    ];
    ws['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } },
        { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } }
    ];
    return ws;
}

function exportTrmdToExcel() {
    const epleLabel = epleIdentity && epleIdentity.name ? `_${sanitizeFileName(epleIdentity.name)}` : '';
    const dateStr = new Date().toISOString().slice(0, 10);
    downloadBytes(buildStyledXlsxBytes([styledTrmdSheet()]), `TRMD${epleLabel}_${dateStr}.xlsx`, 'xlsx');
}

// Export PDF du TRMD : même style que l'export pour la présentation, sans couverture ni sommaire
function exportTrmdToPdf() {
    const sections = {};
    PRESENTATION_SECTIONS.forEach(([k]) => { sections[k] = (k === 'trmd'); });
    generatePresentationPdf({ sections, disciplines: Object.keys(dataStore), levels: levels.slice(), bare: true });
}

// 🎨 CLASSEURS MIS EN FORME (.xlsx et .ods) — construits sans bibliothèque externe
// Modèle de feuille : { name, rows: [[{v, s}|null]], colWidths, merges: [{r, c1, c2}], freeze: {cols, rows} }
const XS = {};
const XLS_DEFS = [
    ['DEFAULT', {}],
    ['TITLE', { bold: 1, size: 16, color: '1E3A8A', noBorder: 1, h: 'left' }],
    ['HEADER', { bold: 1, color: 'FFFFFF', fill: '2563EB', border: 1, h: 'center', wrap: 1 }],
    ['LABEL', { bold: 1, fill: 'E2E8F0', border: 1, h: 'left', wrap: 1, indent: 1 }],
    ['LABEL_ZEBRA', { bold: 1, fill: 'CBD5E1', border: 1, h: 'left', wrap: 1, indent: 1 }],
    ['BODY', { border: 1, h: 'center', wrap: 1 }],
    ['BODY_ZEBRA', { fill: 'F8FAFC', border: 1, h: 'center', wrap: 1 }],
    ['ALLOC', { bold: 1, fill: 'DBEAFE', color: '1E3A8A', border: 1, h: 'center', wrap: 1 }],
    ['NOTE', { italic: 1, size: 10, color: '64748B', noBorder: 1, h: 'left' }],
    ['SECTION', { bold: 1, size: 13, color: '2563EB', noBorder: 1, h: 'left' }],
    ['TOTAL_LABEL', { bold: 1, fill: 'E2E8F0', border: 1, h: 'right', wrap: 1, indent: 1 }],
    ['TOTAL_CELL', { bold: 1, fill: 'E2E8F0', border: 1, h: 'center', wrap: 1 }],
    ['GRAND_LABEL', { bold: 1, fill: 'FEF3C7', border: 1, h: 'right', wrap: 1, indent: 1 }],
    ['GRAND_CELL', { bold: 1, fill: 'FEF3C7', border: 1, h: 'center', wrap: 1 }],
    ['ARE_LABEL', { italic: 1, fill: 'F1F5F9', border: 1, h: 'right', wrap: 1, indent: 1 }],
    ['ARE_CELL', { fill: 'F1F5F9', border: 1, h: 'center', wrap: 1 }],
    ['GRAND_LEFT', { bold: 1, fill: 'FEF3C7', border: 1, h: 'left', wrap: 1, indent: 1 }]
];
XLS_DEFS.forEach(([name], i) => { XS[name] = i; });

function xlsEsc(str) {
    return String(str).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function xlsCol(i) {
    let n = i + 1, s = '';
    while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); }
    return s;
}

function xlsStylesXml() {
    const fonts = [], fills = ['<fill><patternFill patternType="none"/></fill>', '<fill><patternFill patternType="gray125"/></fill>'];
    const fontIdx = {}, fillIdx = {};
    const fontOf = d => {
        const k = `${d.bold ? 1 : 0}|${d.italic ? 1 : 0}|${d.size || 11}|${d.color || ''}`;
        if (!(k in fontIdx)) {
            fontIdx[k] = fonts.length;
            fonts.push(`<font>${d.bold ? '<b/>' : ''}${d.italic ? '<i/>' : ''}<sz val="${d.size || 11}"/>${d.color ? `<color rgb="FF${d.color}"/>` : ''}<name val="Calibri"/></font>`);
        }
        return fontIdx[k];
    };
    const fillOf = d => {
        if (!d.fill) return 0;
        if (!(d.fill in fillIdx)) { fillIdx[d.fill] = fills.length; fills.push(`<fill><patternFill patternType="solid"><fgColor rgb="FF${d.fill}"/><bgColor indexed="64"/></patternFill></fill>`); }
        return fillIdx[d.fill];
    };
    const xfs = XLS_DEFS.map(([, d]) => {
        const f = fontOf(d), fl = fillOf(d), b = d.border ? 1 : 0;
        return `<xf numFmtId="0" fontId="${f}" fillId="${fl}" borderId="${b}" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="${d.h || 'general'}" vertical="center"${d.wrap ? ' wrapText="1"' : ''}${d.indent ? ` indent="${d.indent}"` : ''}/></xf>`;
    });
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="${fonts.length}">${fonts.join('')}</fonts><fills count="${fills.length}">${fills.join('')}</fills><borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left style="thin"><color rgb="FF475569"/></left><right style="thin"><color rgb="FF475569"/></right><top style="thin"><color rgb="FF475569"/></top><bottom style="thin"><color rgb="FF475569"/></bottom><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="${xfs.length}">${xfs.join('')}</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`;
}

// Hauteur de ligne estimée (points) selon le texte à renvoyer à la ligne.
function xlsRowHeight(row, widths, merge) {
    let lines = 1, isTitle = false, isHeader = false;
    row.forEach((cell, c) => {
        if (!cell) return;
        if (cell.s === XS.TITLE) isTitle = true;
        if (cell.s === XS.HEADER) isHeader = true;
        if (cell.v === undefined || cell.v === '' || cell.s === XS.TITLE || cell.s === XS.NOTE || cell.s === XS.SECTION) return;
        let cw = widths[c] || 12;
        if (merge && c === merge.c1) { cw = 0; for (let k = merge.c1; k <= merge.c2; k++) cw += widths[k] || 12; }
        const w = Math.max(6, cw - 3);
        const n = String(cell.v).split('\n').reduce((sum, part) => sum + Math.max(1, Math.ceil(part.length / w)), 0);
        if (n > lines) lines = n;
    });
    if (isTitle) return 30;
    return Math.max(isHeader ? 32 : 24, lines * 16 + 8);
}

function xlsSheetXml(sheet) {
    const widths = sheet.colWidths;
    const rowsXml = sheet.rows.map((row, r) => {
        const cells = row.map((cell, c) => {
            if (!cell) return '';
            const ref = xlsCol(c) + (r + 1), st = cell.s || 0;
            if (cell.v === undefined || cell.v === '') return `<c r="${ref}" s="${st}"/>`;
            if (typeof cell.v === 'number' && isFinite(cell.v)) return `<c r="${ref}" s="${st}"><v>${cell.v}</v></c>`;
            return `<c r="${ref}" s="${st}" t="inlineStr"><is><t xml:space="preserve">${xlsEsc(cell.v)}</t></is></c>`;
        }).join('');
        return `<row r="${r + 1}" ht="${xlsRowHeight(row, widths, (sheet.merges || []).find(m => m.r === r))}" customHeight="1">${cells}</row>`;
    }).join('');
    const cols = widths.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('');
    const fr = sheet.freeze;
    const pane = fr ? `<pane xSplit="${fr.cols}" ySplit="${fr.rows}" topLeftCell="${xlsCol(fr.cols)}${fr.rows + 1}" activePane="bottomRight" state="frozen"/>` : '';
    const merges = sheet.merges && sheet.merges.length
        ? `<mergeCells count="${sheet.merges.length}">${sheet.merges.map(m => `<mergeCell ref="${xlsCol(m.c1)}${m.r + 1}:${xlsCol(m.c2)}${m.r + 1}"/>`).join('')}</mergeCells>` : '';
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetPr><pageSetUpPr fitToPage="1"/></sheetPr><sheetViews><sheetView workbookViewId="0" showGridLines="0">${pane}</sheetView></sheetViews><sheetFormatPr defaultRowHeight="18"/><cols>${cols}</cols><sheetData>${rowsXml}</sheetData>${merges}<pageMargins left="0.4" right="0.4" top="0.5" bottom="0.5" header="0.3" footer="0.3"/><pageSetup paperSize="9" orientation="landscape" fitToWidth="1" fitToHeight="0"/></worksheet>`;
}

let _xlsCrcTable = null;
function xlsCrc32(bytes) {
    if (!_xlsCrcTable) {
        _xlsCrcTable = new Uint32Array(256);
        for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; _xlsCrcTable[n] = c >>> 0; }
    }
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < bytes.length; i++) crc = _xlsCrcTable[(crc ^ bytes[i]) & 0xFF] ^ (crc >>> 8);
    return (crc ^ 0xFFFFFFFF) >>> 0;
}

// Archive ZIP « stockée » (sans compression) — le premier fichier reste en tête (requis par .ods).
function xlsZipBytes(files) {
    const enc = new TextEncoder();
    const parts = [], central = [];
    let offset = 0;
    files.forEach(f => {
        const nameBytes = enc.encode(f.name), data = enc.encode(f.content), crc = xlsCrc32(data);
        const local = new Uint8Array(30 + nameBytes.length), lv = new DataView(local.buffer);
        lv.setUint32(0, 0x04034b50, true); lv.setUint16(4, 20, true); lv.setUint16(6, 0x0800, true); lv.setUint16(8, 0, true);
        lv.setUint16(10, 0, true); lv.setUint16(12, 0x21, true); lv.setUint32(14, crc, true);
        lv.setUint32(18, data.length, true); lv.setUint32(22, data.length, true); lv.setUint16(26, nameBytes.length, true);
        local.set(nameBytes, 30);
        parts.push(local, data);
        const cd = new Uint8Array(46 + nameBytes.length), cv = new DataView(cd.buffer);
        cv.setUint32(0, 0x02014b50, true); cv.setUint16(4, 20, true); cv.setUint16(6, 20, true); cv.setUint16(8, 0x0800, true);
        cv.setUint16(14, 0x21, true); cv.setUint32(16, crc, true); cv.setUint32(20, data.length, true); cv.setUint32(24, data.length, true);
        cv.setUint16(28, nameBytes.length, true); cv.setUint32(42, offset, true);
        cd.set(nameBytes, 46);
        central.push(cd);
        offset += local.length + data.length;
    });
    const cdSize = central.reduce((n, c) => n + c.length, 0);
    const end = new Uint8Array(22), ev = new DataView(end.buffer);
    ev.setUint32(0, 0x06054b50, true); ev.setUint16(8, files.length, true); ev.setUint16(10, files.length, true);
    ev.setUint32(12, cdSize, true); ev.setUint32(16, offset, true);
    const all = [...parts, ...central, end];
    const total = all.reduce((n, p) => n + p.length, 0);
    const out = new Uint8Array(total);
    let pos = 0;
    all.forEach(p => { out.set(p, pos); pos += p.length; });
    return out;
}

function buildStyledXlsxBytes(sheets) {
    const files = [
        { name: '[Content_Types].xml', content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheets.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}</Types>` },
        { name: '_rels/.rels', content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>` },
        { name: 'xl/workbook.xml', content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheets.map((sh, i) => `<sheet name="${xlsEsc(sh.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')}</sheets></workbook>` },
        { name: 'xl/_rels/workbook.xml.rels', content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('')}<Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>` },
        { name: 'xl/styles.xml', content: xlsStylesXml() }
    ];
    sheets.forEach((sh, i) => files.push({ name: `xl/worksheets/sheet${i + 1}.xml`, content: xlsSheetXml(sh) }));
    return xlsZipBytes(files);
}

function buildStyledOdsBytes(sheets) {
    const cm = v => (v).toFixed(3) + 'cm';
    const cellStyles = XLS_DEFS.map(([, d], i) => {
        const cell = `${d.fill ? ` fo:background-color="#${d.fill}"` : ''}${d.border ? ' fo:border="0.5pt solid #475569"' : ' fo:border="none"'} style:vertical-align="middle"${d.wrap ? ' fo:wrap-option="wrap"' : ''}`;
        const align = d.h === 'center' ? 'center' : (d.h === 'right' ? 'end' : 'start');
        const para = `fo:text-align="${align}"${d.indent ? ' fo:margin-left="0.2cm"' : ''}`;
        const text = `fo:font-size="${d.size || 11}pt"${d.bold ? ' fo:font-weight="bold"' : ''}${d.italic ? ' fo:font-style="italic"' : ''}${d.color ? ` fo:color="#${d.color}"` : ''}`;
        return `<style:style style:name="ce${i}" style:family="table-cell"><style:table-cell-properties${cell}/><style:paragraph-properties ${para}/><style:text-properties ${text}/></style:style>`;
    }).join('');
    let extraStyles = '';
    const tablesXml = sheets.map((sh, si) => {
        const colStyles = sh.colWidths.map((w, i) => { extraStyles += `<style:style style:name="co${si}_${i}" style:family="table-column"><style:table-column-properties style:column-width="${cm(w * 0.19)}"/></style:style>`; return `<table:table-column table:style-name="co${si}_${i}"/>`; }).join('');
        const rowsXml = sh.rows.map((row, r) => {
            const ht = xlsRowHeight(row, sh.colWidths, (sh.merges || []).find(m => m.r === r));
            extraStyles += `<style:style style:name="ro${si}_${r}" style:family="table-row"><style:table-row-properties style:row-height="${cm(ht / 28.35)}" style:use-optimal-row-height="false"/></style:style>`;
            const merge = (sh.merges || []).find(m => m.r === r);
            let cellsXml = '';
            for (let c = 0; c < sh.colWidths.length; c++) {
                if (merge && c > merge.c1 && c <= merge.c2) { cellsXml += '<table:covered-table-cell/>'; continue; }
                const cell = row[c];
                const span = merge && c === merge.c1 ? ` table:number-columns-spanned="${merge.c2 - merge.c1 + 1}"` : '';
                if (!cell) { cellsXml += `<table:table-cell${span}/>`; continue; }
                const st = ` table:style-name="ce${cell.s || 0}"`;
                if (cell.v === undefined || cell.v === '') { cellsXml += `<table:table-cell${st}${span}/>`; continue; }
                if (typeof cell.v === 'number' && isFinite(cell.v)) { cellsXml += `<table:table-cell${st}${span} office:value-type="float" office:value="${cell.v}"><text:p>${cell.v}</text:p></table:table-cell>`; continue; }
                cellsXml += `<table:table-cell${st}${span} office:value-type="string">${String(cell.v).split('\n').map(p => `<text:p>${xlsEsc(p)}</text:p>`).join('')}</table:table-cell>`;
            }
            return `<table:table-row table:style-name="ro${si}_${r}">${cellsXml}</table:table-row>`;
        }).join('');
        return `<table:table table:name="${xlsEsc(sh.name)}" table:style-name="ta1">${colStyles}${rowsXml}</table:table>`;
    }).join('');
    const content = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0" xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0" xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0" xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0" office:version="1.2"><office:automatic-styles>${cellStyles}${extraStyles}<style:style style:name="ta1" style:family="table" style:master-page-name="Default"><style:table-properties table:display="true"/></style:style></office:automatic-styles><office:body><office:spreadsheet>${tablesXml}</office:spreadsheet></office:body></office:document-content>`;
    return xlsZipBytes([
        { name: 'mimetype', content: 'application/vnd.oasis.opendocument.spreadsheet' },
        { name: 'META-INF/manifest.xml', content: `<?xml version="1.0" encoding="UTF-8"?>
<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2"><manifest:file-entry manifest:full-path="/" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/><manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/><manifest:file-entry manifest:full-path="styles.xml" manifest:media-type="text/xml"/></manifest:manifest>` },
        { name: 'styles.xml', content: `<?xml version="1.0" encoding="UTF-8"?>
<office:document-styles xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0" xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0" office:version="1.2"><office:automatic-styles><style:page-layout style:name="pm1"><style:page-layout-properties fo:page-width="29.7cm" fo:page-height="21cm" style:print-orientation="landscape" fo:margin-top="1cm" fo:margin-bottom="1cm" fo:margin-left="1cm" fo:margin-right="1cm" style:scale-to-X="1" style:scale-to-Y="0"/></style:page-layout></office:automatic-styles><office:master-styles><style:master-page style:name="Default" style:page-layout-name="pm1"/></office:master-styles></office:document-styles>` },
        { name: 'content.xml', content }
    ]);
}

function styledBytes(sheets, format) {
    return format === 'ods' ? buildStyledOdsBytes(sheets) : buildStyledXlsxBytes(sheets);
}

function downloadBytes(bytes, fileName, format) {
    const mime = format === 'ods' ? 'application/vnd.oasis.opendocument.spreadsheet' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const url = URL.createObjectURL(new Blob([bytes], { type: mime }));
    const a = document.createElement('a');
    a.href = url; a.download = fileName;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function bytesToBase64(bytes) {
    let bin = '';
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(bin);
}

// --- Feuille TRMD mise en forme ---
function styledTrmdSheet() {
    const raw = buildTrmdSheetData();
    const nCols = 6;
    const C = (v, s) => ({ v, s });
    const pad = r => { while (r.length < nCols) r.push(null); return r; };
    const rows = [];
    raw.forEach((r, i) => {
        if (i === 0) rows.push(pad([C(r[0], XS.TITLE)]));
        else if (i === 1) rows.push(pad([C(r[0], XS.NOTE)]));
        else if (r.length === 0) rows.push(pad([]));
        else if (i >= 3 && i <= 6) rows.push(pad([C(r[0], XS.LABEL), C(r[1], XS.BODY)]));
        else if (i === 8) rows.push(pad(r.map(v => C(v, XS.HEADER))));
        else if (i === raw.length - 1) rows.push(pad(r.map((v, c) => C(v, c === 0 ? XS.GRAND_LEFT : XS.GRAND_CELL))));
        else { const z = (i - 9) % 2 === 1; rows.push(pad(r.map((v, c) => C(v, c === 0 ? (z ? XS.LABEL_ZEBRA : XS.LABEL) : (z ? XS.BODY_ZEBRA : XS.BODY))))); }
    });
    return { name: 'TRMD', rows, colWidths: [30, 11, 14, 20, 12, 26], merges: [{ r: 0, c1: 0, c2: 5 }, { r: 1, c1: 0, c2: 5 }], freeze: null };
}

// --- Feuille d'une discipline mise en forme ---
function styledDisciplineSheet(disc) {
    const raw = buildDisciplineSheetData(disc);
    const data = dataStore[disc];
    const C = (v, s) => ({ v, s });
    if (!data) return { name: sanitizeSheetName(disc), rows: [[C('Discipline introuvable', XS.NOTE)]], colWidths: [30], merges: [], freeze: null };
    const pond = pondEnabled();
    const L = pond ? 5 : 4;                       // colonne « Cible » : les libellés de totaux s'y arrêtent
    const nTeach = data.teachers.length;
    const nCols = L + 1 + nTeach;
    const nServices = data.services.length + getCrossListedOptions(disc).length;
    const pad = r => { while (r.length < nCols) r.push(null); return r; };
    const rows = [], merges = [];

    const subtitle = epleIdentity && epleIdentity.name
        ? `${epleIdentity.name}${epleIdentity.commune ? ' — ' + epleIdentity.commune : ''}` : '';
    rows.push(pad([C(raw[0][0], XS.TITLE)]));
    merges.push({ r: 0, c1: 0, c2: nCols - 1 });
    rows.push(pad(subtitle ? [C(subtitle, XS.NOTE)] : []));
    if (subtitle) merges.push({ r: 1, c1: 0, c2: nCols - 1 });

    raw.slice(2).forEach((r, i) => {
        const isHeader = i === 0;
        const svcIdx = i - 1;                      // index du service (hors en-tête)
        if (isHeader) { rows.push(pad(r.map(v => C(v, XS.HEADER)))); return; }
        if (svcIdx < nServices) {
            const z = svcIdx % 2 === 1;
            rows.push(pad(r.map((v, c) => {
                if (c === 0) return C(v, XS.BODY);
                if (c === 1) return C(v, z ? XS.LABEL_ZEBRA : XS.LABEL);
                if (c > L) return C(v, (typeof v === 'number' && v > 0) ? XS.ALLOC : (z ? XS.BODY_ZEBRA : XS.BODY));
                return C(v, z ? XS.BODY_ZEBRA : XS.BODY);
            })));
            return;
        }
        // Lignes de synthèse : Total alloué, ARE, Total général, ORS, HSA
        const label = String(r[L] || '');
        const isGrand = label.startsWith('Total général');
        const isAre = label.startsWith('ARE');
        const lblStyle = isGrand ? XS.GRAND_LABEL : (isAre ? XS.ARE_LABEL : XS.TOTAL_LABEL);
        const cellStyle = isGrand ? XS.GRAND_CELL : (isAre ? XS.ARE_CELL : XS.TOTAL_CELL);
        const row = [];
        for (let c = 0; c <= L; c++) row.push(C(c === 0 ? label : '', lblStyle));
        for (let c = L + 1; c < nCols; c++) row.push(C(r[c], cellStyle));
        rows.push(pad(row));
        merges.push({ r: rows.length - 1, c1: 0, c2: L });
    });

    const colWidths = pond ? [11, 38, 11, 11, 13, 11] : [11, 38, 11, 11, 11];
    for (let t = 0; t < nTeach; t++) colWidths.push(16);
    return { name: sanitizeSheetName(disc), rows, colWidths, merges, freeze: { cols: 2, rows: 3 } };
}

// 📊 EXPORT AU FORMAT TABLEUR (multi-disciplines + TRMD, .xlsx / .ods)
function buildDisciplineSheetData(disc) {
    const data = dataStore[disc];
    if (!data) return [['Discipline introuvable']];
    if (!data.apports) data.apports = {};

    const services = data.services.concat(getCrossListedOptions(disc).map(row => row.service));
    const teachers = data.teachers;

    const header = ['Niveau', 'Intitulé Service / Matière', 'Nb. Classes', 'Vol. Classe', 'Pondération', 'Cible (h)', ...teachers];
    const rows = [[`Discipline : ${disc}`], [], header];

    const teacherTotalsRaw = {};
    const teacherTotalsPond = {};
    const teacher11RawSums = {};
    teachers.forEach(t => {
        teacherTotalsRaw[t] = 0;
        teacherTotalsPond[t] = 0;
        teacher11RawSums[t] = 0;
    });

    services.forEach(service => {
        const classes = service.classes || 0;
        const hours = service.hours || 0;
        const target = classes * hours;
        const factor = service.ponderationActive ? (service.ponderationFactor || 1.1) : 1;
        const levelLabel = service.isOptionnel
            ? (Array.isArray(service.levels) ? service.levels.join(', ') : (service.level || ''))
            : (service.level || '');

        const row = [levelLabel, service.name || '', classes, hours, service.ponderationActive ? factor : '—', parseFloat(target.toFixed(1))];

        teachers.forEach(t => {
            const val = parseFloat(service.allocations[t]) || 0;
            row.push(val || '');
            teacherTotalsRaw[t] += val;

            teacher11RawSums['raw:' + t] = (teacher11RawSums['raw:' + t] || 0) + val;

            if (service.ponderationActive && val > 0) {
                if (Math.abs(factor - 1.25) < 0.01) {
                    teacher11RawSums['125:' + t] = (teacher11RawSums['125:' + t] || 0) + val;
                } else if (Math.abs(factor - 1.1) < 0.01) {
                    teacher11RawSums[t] += val * 0.1;
                } else {
                    teacher11RawSums['x:' + t] = teacher11RawSums['x:' + t] || {};
                    teacher11RawSums['x:' + t][factor] = (teacher11RawSums['x:' + t][factor] || 0) + val;
                }
            }
        });

        rows.push(row);
    });

    teachers.forEach(t => {
        teacherTotalsPond[t] += pondExtra(teacher11RawSums, t, data);
    });

    const totalRow = ['', '', '', '', '', 'Total alloué (h)'];
    teachers.forEach(t => totalRow.push(parseFloat(teacherTotalsRaw[t].toFixed(2))));
    rows.push(totalRow);

    // ARE : une ligne par ARE distincte (rien si aucune)
    const areKeys = [];
    teachers.forEach(t => getTeacherAres(data, t).forEach(a => {
        const key = (a.short || '') + '|' + (a.label || a.short || '');
        if (!areKeys.some(k => k.key === key)) areKeys.push({ key, short: a.short || '', label: a.label || a.short || '' });
    }));
    areKeys.forEach(k => {
        const label = k.label && k.label !== k.short ? `ARE : ${k.label} (${k.short})` : `ARE : ${k.short}`;
        const r = ['', '', '', '', '', label];
        teachers.forEach(t => {
            const h = getTeacherAres(data, t)
                .filter(a => (a.short || '') + '|' + (a.label || a.short || '') === k.key)
                .reduce((x, a) => x + (parseFloat(a.hours) || 0), 0);
            r.push(h ? parseFloat(h.toFixed(2)) : '');
        });
        rows.push(r);
    });

    const grandTotalRow = ['', '', '', '', '', 'Total général (h)'];
    teachers.forEach(t => grandTotalRow.push(parseFloat((teacherTotalsRaw[t] + teacherTotalsPond[t] + areTotal(data, t)).toFixed(2))));
    rows.push(grandTotalRow);

    const apportRow = ['', '', '', '', '', 'ORS (h)'];
    teachers.forEach(t => apportRow.push(data.apports[t] !== undefined ? data.apports[t] : 18));
    rows.push(apportRow);

    const hsaRow = ['', '', '', '', '', 'HSA (h)'];
    teachers.forEach(t => {
        const grandTotal = teacherTotalsRaw[t] + teacherTotalsPond[t] + areTotal(data, t);
        const apport = data.apports[t] !== undefined ? data.apports[t] : 18;
        hsaRow.push(parseFloat((grandTotal - apport).toFixed(2)));
    });
    rows.push(hsaRow);

    if (!pondEnabled()) {
        return rows.map(r => (r.length >= 6 ? r.filter((_, i) => i !== 4) : r));
    }
    return rows;
}

function buildDisciplineSheet(disc) {
    const ws = XLSX.utils.aoa_to_sheet(buildDisciplineSheetData(disc));
    ws['!cols'] = [
        { wch: 12 }, { wch: 28 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }
    ];
    // libellés longs (ARE) lisibles
    ws['!cols'][5] = { wch: 30 };
    return ws;
}

function sanitizeSheetName(name) {
    const cleaned = (name || '').replace(/[\\\/\?\*\[\]:]/g, ' ').trim().substring(0, 31);
    return cleaned || 'Feuille';
}

// Ne retire que les caractères réellement interdits dans un nom de fichier
// (Windows étant le plus restrictif : \ / : * ? " < > |) — les accents,
// espaces et autres signes de ponctuation restent parfaitement valides et
// sont donc conservés tels quels.
function sanitizeFileName(name) {
    return (name || '').replace(/[\\/:*?"<>|]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function openTableExportModal() {
    renderTableExportDisciplinesList();
    const dateStr = new Date().toISOString().slice(0, 10);
    const epleLabel = epleIdentity && epleIdentity.name ? sanitizeFileName(epleIdentity.name) : 'EPLE';
    document.getElementById('exportFileName').value = `DHG_${epleLabel}_${dateStr}`;
    document.getElementById('tableExportModal').classList.add('active');
}

function closeTableExportModal() {
    document.getElementById('tableExportModal').classList.remove('active');
}

function renderTableExportDisciplinesList() {
    const container = document.getElementById('exportDisciplinesList');
    const disciplines = Object.keys(dataStore);

    if (disciplines.length === 0) {
        container.innerHTML = '<div class="empty-state" style="padding: 12px; font-size: 0.85rem;">Aucune discipline configurée.</div>';
        return;
    }

    container.innerHTML = disciplines.map(disc => `
        <label class="export-checkbox-item">
            <input type="checkbox" class="export-disc-checkbox" value="${disc.replace(/"/g, '&quot;')}" checked>
            ${disc}
        </label>
    `).join('');
}

function setAllExportDisciplines(checked) {
    document.querySelectorAll('.export-disc-checkbox').forEach(cb => {
        cb.checked = checked;
    });
}

function performTableExport() {
    const format = document.querySelector('input[name="exportFormat"]:checked').value;
    const mode = document.querySelector('input[name="exportMode"]:checked').value;
    const includeTrmd = document.getElementById('exportIncludeTrmd').checked;
    const selectedDiscs = Array.from(document.querySelectorAll('.export-disc-checkbox:checked')).map(cb => cb.value);

    if (selectedDiscs.length === 0 && !includeTrmd) {
        alert("Veuillez sélectionner au moins une discipline ou le TRMD à exporter.");
        return;
    }

    const dateStr = new Date().toISOString().slice(0, 10);
    const epleLabel = epleIdentity && epleIdentity.name ? `_${sanitizeFileName(epleIdentity.name)}` : '';

    const customNameRaw = document.getElementById('exportFileName').value.trim();
    const baseName = sanitizeFileName(customNameRaw || `DHG${epleLabel}_${dateStr}`);

    // Noms de feuille uniques (31 caractères maximum)
    const used = new Set();
    const uniq = sh => {
        let n = sh.name, i = 2;
        while (used.has(n.toLowerCase())) { n = sh.name.slice(0, 27) + ' (' + i++ + ')'; }
        used.add(n.toLowerCase());
        return Object.assign({}, sh, { name: n });
    };

    if (mode === 'single') {
        const sheets = [];
        if (includeTrmd) sheets.push(styledTrmdSheet());
        selectedDiscs.forEach(disc => sheets.push(styledDisciplineSheet(disc)));
        downloadBytes(styledBytes(sheets.map(uniq), format), `${baseName}.${format}`, format);
    } else {
        // Les navigateurs bloquent ou n'enclenchent que le dernier téléchargement lorsque
        // plusieurs fichiers sont générés dans la même boucle synchrone : on espace donc
        // chaque téléchargement pour que chaque fichier soit bien pris en compte.
        const downloads = [];
        if (includeTrmd) downloads.push(() => downloadBytes(styledBytes([styledTrmdSheet()], format), `${baseName}_TRMD.${format}`, format));
        selectedDiscs.forEach(disc => {
            downloads.push(() => downloadBytes(styledBytes([styledDisciplineSheet(disc)], format), `${baseName}_${sanitizeFileName(disc)}.${format}`, format));
        });
        downloads.forEach((downloadFn, i) => setTimeout(downloadFn, i * 400));
    }

    closeTableExportModal();
}

function closeTrmdModal() {
    document.getElementById('trmdModal').classList.remove('active');
}

// ------------------------------------------------------------------
// Horaires réglementaires — bouton + fenêtre à trois onglets (CLG / LGT /
// LP). Contenu à intégrer ensuite, tableau par tableau.
// ------------------------------------------------------------------

let currentHorairesRegTab = 'clg';
let currentHorairesRegNiveau = null;
let currentHorairesRegFiliere = null;

const HORAIRES_REG_TAB_LABELS = {
    clg: 'Collège (CLG)',
    lgt: 'Lycée (LGT)',
    lp: 'Lycée Professionnel (LP)'
};

// Tableaux de référence fournis, affichés tels quels. Chaque voie peut
// contenir plusieurs tableaux (un par niveau/filière), avec un titre et une
// note optionnelle affichée en italique sous le tableau.
const HORAIRES_REG_TABLES = {
    clg: [
        {
            title: '6e',
            headers: ['Enseignements', 'Horaires hebdomadaires'],
            rows: [
                ['Français', '4h30'],
                ['Mathématiques', '4h30'],
                ['Histoire-géographie / Enseignement moral et civique', '3h'],
                ['Langue vivante', '4h'],
                ['Sciences de la vie et de la Terre / Physique-chimie', '3h'],
                ['Éducation physique et sportive', '4h'],
                ['Enseignements artistiques (arts plastiques + éducation musicale)', '1h + 1h'],
                ['Soutien ou approfondissement (français ou maths)', '1h'],
                ['Total', '26 heures']
            ],
            note: "Note : Sur ces 26 heures, 3 heures hebdomadaires sont consacrées aux enseignements complémentaires (accompagnement personnalisé et/ou enseignements pratiques interdisciplinaires). S'y ajoutent au moins 10 heures annuelles de vie de classe."
        },
        {
            title: 'Cycle 4 (5e, 4e, 3e)',
            headers: ['Enseignements', 'Cinquième', 'Quatrième', 'Troisième'],
            rows: [
                ['Français', '4h30', '4h30', '4h'],
                ['Mathématiques', '3h30', '3h30', '3h30'],
                ['Histoire-géographie / Enseignement moral et civique', '3h', '3h', '3h30'],
                ['Langue vivante 1', '3h', '3h', '3h'],
                ['Langue vivante 2', '2h30', '2h30', '2h30'],
                ['Sciences de la vie et de la Terre', '1h30', '1h30', '1h30'],
                ['Physique-chimie', '1h30', '1h30', '1h30'],
                ['Technologie', '1h30', '1h30', '1h30'],
                ['Éducation physique et sportive', '3h', '3h', '3h'],
                ['Enseignements artistiques (arts plastiques + éducation musicale)', '1h + 1h', '1h + 1h', '1h + 1h'],
                ['Total', '26h', '26h', '26h']
            ],
            note: "Note : Sur ces 26 heures, 4 heures hebdomadaires sont consacrées aux enseignements complémentaires (accompagnement personnalisé et/ou enseignements pratiques interdisciplinaires). S'y ajoutent au moins 10 heures annuelles de vie de classe par niveau."
        }
    ],
    lgt: {
        '2nd': {
            '2nd GT': [
                {
                    title: '2de générale et technologique',
                    footnotes: [
                        '(a) La langue vivante B ou C peut être étrangère ou régionale.',
                        '(b) Enseignement auquel peut s\'ajouter une heure avec un assistant de langue.',
                        '(c) Volume horaire déterminé selon les besoins des élèves.',
                        '(d) 54 heures, à titre indicatif, selon les besoins des élèves et les modalités de l\'accompagnement à l\'orientation mises en place dans l\'établissement.',
                        '(e) Les enseignements optionnels de LCA latin et grec peuvent être choisis en plus des enseignements optionnels suivis par ailleurs.',
                        '(f) Enseignements assurés uniquement dans les lycées d\'enseignement général et technologique agricole.',
                        '(g) Enseignements pouvant être suivis par les élèves inscrits au sein d\'un établissement d\'enseignement artistique classé ou reconnu par l\'Etat et sous réserve d\'une convention signée entre l\'établissement où est scolarisé l\'élève et cet établissement d\'enseignement artistique.',
                    ],
            headers: ['Enseignements', 'Horaire élève'],
            rows: [
                { section: 'ENSEIGNEMENTS COMMUNS' },
                ['Français', '4 heures'],
                ['Histoire-Géographie', '3 heures'],
                ['LVA et LVB (enveloppe globalisée) (a) (b)', '5 h 30'],
                ['Sciences économiques et sociales', '1 h 30'],
                ['Mathématiques', '4 heures'],
                ['Physique-chimie', '3 heures'],
                ['Sciences de la vie et de la Terre', '1 h 30'],
                ['Education physique et sportive', '2 heures'],
                ['Enseignement moral et civique', '18 heures annuelles'],
                ['Sciences numériques et technologie', '1 h 30'],
                ['Séquence d\'observation en milieu professionnel', '2 semaines'],
                ['Accompagnement personnalisé (c)', ''],
                ['Accompagnement au choix de l\'orientation (d)', ''],
                ['Heures de vie de classe', ''],
                { section: 'ENSEIGNEMENTS OPTIONNELS' },
                { subsection: '1 enseignement général au choix parmi' },
                ['Langues et cultures de l\'Antiquité : latin (e)', '3 heures'],
                ['Langues et cultures de l\'Antiquité : grec (e)', '3 heures'],
                ['Langue vivante C (a) (b)', '3 heures'],
                ['Langue des signes française', '3 heures'],
                ['Arts : au choix parmi arts plastiques ou cinéma-audiovisuel ou danse ou histoire des arts ou musique ou théâtre', '3 heures'],
                ['Education physique et sportive', '3 heures'],
                ['Arts du cirque', '6 heures'],
                ['Ecologie-agronomie-territoires-développement durable (f)', '3 heures'],
                { subsection: '1 enseignement technologique au choix parmi' },
                ['Management et gestion', '1 h 30'],
                ['Santé et social', '1 h 30'],
                ['Biotechnologies', '1 h 30'],
                ['Sciences et laboratoire', '1 h 30'],
                ['Sciences de l\'ingénieur', '1 h 30'],
                ['Création et innovation technologiques', '1 h 30'],
                ['Création et culture - design', '6 heures'],
                ['Hippologie et équitation ou autres pratiques sportives (f)', '3 heures'],
                ['Pratiques sociales et culturelles (f)', '3 heures'],
                ['Pratiques professionnelles (f)', '3 heures'],
                ['Culture et pratique de la danse/ ou de la musique/ ou du théâtre (g)', '6 heures'],
                ['Atelier artistique', '72 heures annuelles'],
            ]
                }
            ],
            '2nd GT STHR': [
                {
                    title: 'STHR - Sciences et technologies de l\'hôtellerie et de la restauration',
                    headers: ['Enseignements', 'Horaire élève'],
                    rows: [
                        { section: 'Enseignements communs' },
                        ['Mathématiques', '3 heures'],
                        ['Français', '4 heures'],
                        ['Histoire-géographie', '3 heures'],
                        ['LVA + LVB (a)', '5 heures'],
                        ['Education physique et sportive', '2 heures'],
                        ['Sciences', '3 heures'],
                        ['Enseignement moral et civique', '18 heures annuelles'],
                        ['Economie et gestion hôtelière', '2 heures'],
                        ['Sciences et technologies des services', '4 heures'],
                        ['Sciences et technologies culinaires', '4 heures'],
                        ['Stages d\'initiation ou d\'application en milieu professionnel', '4 semaines'],
                        ['Accompagnement personnalisé (b)', ''],
                        ['Accompagnement au choix de l\'orientation (c)', ''],
                        ['Heures de vie de classe', ''],
                        { section: 'Enseignements optionnels : 2 au plus parmi les suivants' },
                        ['Langue vivante C (étrangère ou régionale)', '3 heures'],
                        ['Langue des signes française', '3 heures'],
                        ['Education physique et sportive', '3 heures'],
                        ['Arts (arts plastiques ou cinéma-audiovisuel ou histoire des arts ou musique ou théâtre ou danse)', '3 heures'],
                        ['Atelier artistique', '72 heures annuelles'],
                        ['Séquence d\'observation en milieu professionnel (d)', '2 semaines'],
                    ],
                    footnotes: [
                        '(a) L\'une des deux langues vivantes doit être obligatoirement l\'anglais.',
                        '(b) Volume horaire déterminé selon les besoins des élèves.',
                        '(c) 54 heures, à titre indicatif, selon les besoins des élèves et les modalités de l\'accompagnement à l\'orientation mises en place dans l\'établissement.',
                        '(d) La séquence d\'observation en milieu professionnel peut être réalisée quel que soit le nombre d\'enseignements optionnels suivis par ailleurs.',
                    ]
                }
            ]
        },
        'Cycle terminal de la voie générale': [
            {
                title: 'Horaires des enseignements communs',
                headers: ['Enseignements', 'Horaire 1re', 'Horaire terminale'],
                rows: [
                    ['Français', '4 h', ''],
                    ['Philosophie', '', '4 h'],
                    ['Histoire-géographie', '3 h', '3 h'],
                    ['LVA et LVB (enveloppe globalisée) (a) (b)', '4 h 30', '4 h'],
                    ['Enseignement scientifique (c)', '2 h ou 3h30', '2 h'],
                    ['Éducation physique et sportive', '2 h', '2 h'],
                    ['Enseignement moral et civique', '18 h annuelles', '18 h annuelles'],
                    ['Accompagnement personnalisé (d)', '', ''],
                    ['Accompagnement au choix de l\'orientation (e)', '', ''],
                    ['Heures de vie de classe', '', ''],
                ]
            },
            {
                title: 'Horaires des enseignements de spécialité',
                headers: ['Enseignements', 'Horaire 1re (3 au choix)', 'Horaire terminale (2 au choix)'],
                rows: [
                    ['Arts (f)', '4 h', '6 h'],
                    ['Biologie-écologie (g)', '4 h', '6 h'],
                    ['Éducation physique, pratiques et culture sportives (h)', '4 h', '6 h'],
                    ['Histoire-géographie, géopolitique et sciences politiques', '4 h', '6 h'],
                    ['Humanités, littérature et philosophie', '4 h', '6 h'],
                    ['Langues, littératures et cultures étrangères et régionales (i)', '4 h', '6 h'],
                    ['Littératures et langues et cultures de l\'Antiquité (j)', '4 h', '6 h'],
                    ['Mathématiques', '4 h', '6 h'],
                    ['Numérique et sciences informatiques', '4 h', '6 h'],
                    ['Physique-chimie', '4 h', '6 h'],
                    ['Sciences de la vie et de la Terre', '4 h', '6 h'],
                    ['Sciences de l\'ingénieur (k)', '4 h', '6 h'],
                    ['Sciences économiques et sociales', '4 h', '6 h'],
                ]
            },
            {
                title: 'Horaires des enseignements optionnels',
                headers: ['Enseignements', 'Horaire 1re', 'Horaire terminale'],
                rows: [
                    { subsection: 'a) 1 enseignement en terminale parmi' },
                    ['Mathématiques complémentaires (l)', '', '3 h'],
                    ['Mathématiques expertes (m)', '', '3 h'],
                    ['Droits et grands enjeux du monde contemporain', '', '3 h'],
                    { subsection: 'b) 1 enseignement en 1e et/ou en terminale parmi' },
                    ['Langue vivante C (a) (b)', '3 h', '3 h'],
                    ['LCA : latin (n)', '3 h', '3 h'],
                    ['LCA : grec (n)', '3 h', '3 h'],
                    ['Éducation physique et sportive', '3 h', '3 h'],
                    ['Arts (f)', '3 h', '3 h'],
                    ['Langue des signes française', '3 h', '3 h'],
                    ['Hippologie et équitation (g)', '3 h', '3 h'],
                    ['Agronomie, économie, territoires (g)', '3 h', '3 h'],
                    ['Pratiques sociales et culturelles (g)', '3 h', '3 h'],
                ],
                footnotes: [
                    '(a) La langue vivante B ou C peut être étrangère ou régionale.',
                    '(b) Enseignement auquel peut s\'ajouter une heure avec un assistant en langue.',
                    '(c) Pour les élèves de première n\'ayant pas choisi l\'enseignement de spécialité mathématiques, l\'enseignement scientifique de deux heures hebdomadaires est complété par un enseignement de mathématiques spécifique d\'une durée hebdomadaire d\'une heure trente.',
                    '(d) Volume horaire déterminé selon les besoins des élèves.',
                    '(e) 54 heures, à titre indicatif, selon les besoins des élèves et les modalités de l\'accompagnement à l\'orientation mises en place dans l\'établissement.',
                    '(f) Au choix parmi : arts plastiques, cinéma audiovisuel, danse, histoire des arts, musique ou théâtre. Les arts du cirque ne peuvent être choisis qu\'en enseignement de spécialité.',
                    '(g) Enseignement assuré uniquement dans les lycées d\'enseignement général et technologique agricole.',
                    '(h) Pour les élèves ne choisissant pas en première l\'enseignement optionnel « éducation physique et sportive ».',
                    '(i) L\'enseignement de spécialité langues, littératures et cultures étrangères et régionales (LLCER) est proposé en allemand, anglais, anglais-monde contemporain (AMC), espagnol et italien, portugais et dans les langues régionales suivantes : basque, breton, catalan, corse, créole, occitan-langue d\'Oc et tahitien. L\'élève peut choisir cet enseignement de spécialité uniquement si la langue d\'enseignement de spécialité correspond à sa langue vivante A, B ou C.',
                    '(j) L\'enseignement de spécialité littérature et langues et cultures de l\'Antiquité peut être suivi en latin ou en grec.',
                    '(k) Cet enseignement est complété de 2 heures de sciences physiques en terminale.',
                    '(l) Pour les élèves ne choisissant pas en terminale la spécialité « mathématiques ».',
                    '(m) Pour les élèves choisissant en terminale la spécialité « mathématiques ».',
                    '(n) Les enseignements optionnels de LCA latin et grec peuvent être choisis en plus des enseignements optionnels suivis par ailleurs.',
                ]
            }
        ],
        'Cycle terminal de la voie technologique': [
            {
                kind: 'tables',
                tables: [
                    {
                        title: 'Horaires des enseignements communs',
                        headers: ['Enseignements', 'Classe de première - Horaire par élève', 'Classe de terminale - Horaire par élève'],
                        rows: [
                            ['Français', '3 h', '-'],
                            ['Philosophie', '-', '2 h'],
                            ['Histoire-géographie', '1 h 30', '1 h 30'],
                            ['Enseignement moral et civique', '18 h annuelles', '18 h annuelles'],
                            ['Langues vivantes A et B + enseignement technologique en langue vivante A ou B (1)', '4 h (dont 1 h d\'ETLV)', '4 h (dont 1h d\'ETLV)'],
                            ['Éducation physique et sportive', '2 h', '2 h'],
                            ['Mathématiques', '3 h', '3 h'],
                            ['Accompagnement personnalisé (2)', '', ''],
                            ['Accompagnement au choix de l\'orientation (3)', '', ''],
                            ['Heure de vie de classe', '', ''],
                        ],
                        footnotes: [
                            '(1) La langue vivante A est étrangère. La langue vivante B peut être étrangère ou régionale. L\'horaire élève indiqué correspond à une enveloppe globalisée pour ces deux langues vivantes. À l\'enseignement d\'une langue vivante peut s\'ajouter une heure avec un assistant de langue. L\'enseignement technologique en langue vivante A ou B est pris en charge conjointement par un enseignant d\'une discipline technologique et un enseignant de Langue vivante.',
                            '(2) Volume horaire déterminé selon les besoins des élèves.',
                            '(3) 54 h, à titre indicatif, selon les besoins des élèves et les modalités de l\'accompagnement à l\'orientation mises en place dans l\'établissement.',
                        ]
                    }
                ]
            },
            {
                kind: 'subtabs',
                tabs: {
                    'Série STMG': [
                        {
                            title: 'Horaires des enseignements de spécialité — série STMG',
                            headers: ['Enseignements', 'Classe de première - Horaire par élève', 'Classe de terminale - Horaire par élève'],
                            rows: [
                                ['Sciences de gestion et numérique', '7 h', '-'],
                                ['Management', '4 h', '-'],
                                ['Management, sciences de gestion et numérique<br>avec 1 enseignement spécifique parmi :<br>• gestion et finance ;<br>• mercatique (marketing) ;<br>• ressources humaines et communication ;<br>• systèmes d\'information de gestion', '-', '10 h'],
                                ['Droit et économie', '4 h', '6 h'],
                            ]
                        }
                    ],
                    'Série ST2S': [
                        {
                            title: 'Horaires des enseignements de spécialité — série ST2S',
                            headers: ['Enseignements', 'Classe de première - Horaire par élève', 'Classe de terminale - Horaire par élève'],
                            rows: [
                                ['Physique-Chimie pour la santé', '3 h', '-'],
                                ['Biologie et physiopathologie humaines', '5 h', '-'],
                                ['Chimie, Biologie et physiopathologie humaines', '-', '8 h'],
                                ['Sciences et techniques sanitaires et sociales', '7 h', '8 h'],
                            ]
                        }
                    ],
                    'Série STI2D': [
                        {
                            title: 'Horaires des enseignements de spécialité — série STI2D',
                            headers: ['Enseignements', 'Classe de première - Horaire par élève', 'Classe de terminale - Horaire par élève'],
                            rows: [
                                ['Innovation technologique', '3 h', '-'],
                                ['Ingénierie et développement durable (I2D)', '9 h', '-'],
                                ['Ingénierie, Innovation et développement durable (2I2D)<br>avec 1 enseignement spécifique parmi :<br>• architecture et construction ;<br>• énergies et environnement ;<br>• innovation technologique et écoconception ;<br>• systèmes d\'information et numériques', '-', '12 h'],
                                ['Physique-Chimie et Mathématiques', '6 h', '6 h'],
                            ]
                        }
                    ],
                    'Série STL': [
                        {
                            title: 'Horaires des enseignements de spécialité — série STL',
                            headers: ['Enseignements', 'Classe de première - Horaire par élève', 'Classe de terminale - Horaire par élève'],
                            rows: [
                                ['Physique chimie et Mathématiques', '5 h', '5 h'],
                                ['Biochimie-Biologie', '4 h', '-'],
                                ['Biotechnologie<br>ou Sciences physiques et chimiques en laboratoire', '9 h', '-'],
                                ['Biochimie-Biologie-Biotechnologie<br>ou Sciences physiques et chimiques en laboratoire', '-', '13 h'],
                            ]
                        }
                    ],
                    'Série STD2A': [
                        {
                            title: 'Horaires des enseignements de spécialité — série STD2A',
                            headers: ['Enseignements', 'Classe de première - Horaire par élève', 'Classe de terminale - Horaire par élève'],
                            rows: [
                                ['Physique-Chimie', '2 h', '-'],
                                ['Outils et langage numérique', '2 h', '-'],
                                ['Design et métiers d\'art', '14 h', '-'],
                                ['Analyse et méthode en design', '-', '9 h'],
                                ['Conception et création en design et métiers d\'art', '-', '9 h'],
                            ]
                        }
                    ],
                    'Série STHR': [
                        {
                            title: 'Horaires des enseignements de spécialité — série STHR',
                            headers: ['Enseignements', 'Classe de première - Horaire par élève', 'Classe de terminale - Horaire par élève'],
                            rows: [
                                ['Enseignement scientifique alimentation - environnement (ESAE)', '3 h', '-'],
                                ['Sciences et technologies culinaires et des services', '10 h', '-'],
                                ['Sciences et technologies culinaires et des services -<br>Enseignement scientifique alimentation - environnement (ESAE)', '-', '13 h'],
                                ['Économie - gestion hôtelière', '5 h', '5 h'],
                            ]
                        }
                    ],
                    'Série S2TMD': [
                        {
                            title: 'Horaires des enseignements de spécialité — série S2TMD',
                            headers: ['Enseignements', 'Classe de première - Horaire par élève', 'Classe de terminale - Horaire par élève'],
                            rows: [
                                ['Économie, droit et environnement du spectacle vivant', '3 h', '-'],
                                ['Culture et sciences chorégraphiques / ou musicales / ou théâtrales (4)', '5 h 30', '7 h'],
                                ['Pratique chorégraphique / ou musicale / ou théâtrale (4)', '5 h 30', '7 h'],
                            ]
                        }
                    ],
                }
            },
            {
                kind: 'tables',
                tables: [
                    {
                        title: 'Horaires des enseignements optionnels',
                        headers: ['Enseignements', 'Classe de première - Horaire par élève', 'Classe de terminale - Horaire par élève'],
                        rows: [
                            ['Arts (5)', '3 h', '3 h'],
                            ['Éducation physique et sportive', '3 h', '3 h'],
                            ['Langues des signes française', '3 h', '3 h'],
                            ['Langue vivante C', '3 h', '3 h'],
                            ['Langues et cultures de l\'Antiquité (6)', '3 h', '3 h'],
                            ['Droit et grands enjeux du monde contemporain (7)', '', '3 h'],
                        ],
                        extraNotes: [
                            'En outre, l\'élève peut suivre, en classe de première et terminale, un atelier artistique d\'une durée de 72 h annuelles.',
                            'En classe de première et terminale, le nombre d\'heures pour les enseignements en groupe à effectif réduit est proportionnel au nombre d\'élèves, dans un rapport de 8 h pour 29 élèves.',
                        ],
                        footnotes: [
                            '(5) Au choix parmi : arts plastiques ou cinéma-audiovisuel ou danse ou histoire des arts ou musique ou théâtre.',
                            '(6) Les enseignements optionnels de Langues et cultures de l\'Antiquité (LCA) latin et grec peuvent être choisis en plus de l\'enseignement optionnel suivi par ailleurs.',
                            '(7) Uniquement en classe de terminale.',
                        ]
                    }
                ]
            }
        ],
    },
    lp: {
        'Bac Professionnel (BP)': [
            {
                title: 'Bac Professionnel - Grille horaire',
                headers: ['Enseignements', 'Seconde prof', 'Première prof', 'Terminale prof', 'Total sur 3 ans'],
                rows: [
                    { cells: ['ENSEIGNEMENTS PROFESSIONNELS', '450', '420', '377', '1247'], style: 'section' },
                    { cells: ['Enseignement professionnel', '360', '294', '273', '927'], style: 'normal' },
                    { cells: ['Enseignements professionnels et français en co-intervention (a)', '15', '14', '/', '29'], style: 'normal' },
                    { cells: ['Enseignements professionnels et mathématiques-sciences en co-intervention (a)', '15', '14', '/', '29'], style: 'normal' },
                    { cells: ['Réalisation d\'un projet', '-', '42', '26', '68'], style: 'normal' },
                    { cells: ['Prévention-santé-environnement', '30', '28', '39', '97'], style: 'normal' },
                    { cells: ['Economie-gestion ou économie-droit (selon la spécialité)', '30', '28', '39', '97'], style: 'normal' },
                    { cells: ['ENSEIGNEMENTS GÉNÉRAUX', '390', '350', '390', '1 130'], style: 'section' },
                    { cells: ['Français, histoire-géographie et enseignement moral et civique (b)', '120', '98', '117', '335'], style: 'normal' },
                    { cells: ['Mathématiques (b)', '60', '56', '65', '181'], style: 'normal' },
                    { cells: ['Langue vivante A', '60', '56', '65', '181'], style: 'normal' },
                    { cells: ['Physique-chimie ou langue vivante B (selon la spécialité)', '45', '42', '39', '126'], style: 'normal' },
                    { cells: ['Arts appliqués et culture artistique', '30', '28', '26', '84'], style: 'normal' },
                    { cells: ['Education physique et sportive', '75', '70', '78', '223'], style: 'normal' },
                    { cells: ['SOUTIEN AU PARCOURS', '30', '28', '39', '97'], style: 'section' },
                    { cells: ['TOTAL DES HEURES', '870', '798', '806', '2 474'], style: 'total' },
                    { cells: ['PÉRIODE DE FORMATION EN MILIEU PROFESSIONNEL OBLIGATOIRE POUR L\'EXAMEN', '4 à 6 semaines', '6 à 8 semaines', '6 semaines', '16 à 20 semaines'], style: 'section' },
                    { cells: ['Deux semaines dédiées à la préparation d\'une insertion professionnelle avec PFMP ou à la préparation d\'une poursuite d\'études, pour lesquelles l\'organisation, la répartition et la planification relèvent de l\'autonomie des établissements', '', '2 semaines', '2 semaines', ''], style: 'normal' },
                ],
                footnotes: [
                    '(*) Volume horaire élève identique quelle que soit la spécialité (2 474 h).',
                    '(a) La dotation horaire professeur est égale au double du volume horaire élève.',
                    '(b) Les heures de français et de mathématiques en seconde et en première professionnelle font l\'objet de groupes à effectifs réduits s\'appuyant sur les besoins des élèves pour renforcer l\'acquisition des savoirs fondamentaux, sur la base de l\'article 6 et de l\'annexe 2 du présent arrêté.',
                ]
            }
        ],
        "Certification d'Aptitude Professionnelle (CAP)": [
            {
                title: 'CAP - Grille horaire',
                headers: ['Enseignements', 'P1 Total', 'P1 Classe entière', 'P1 Groupe réduit', 'P2 Total', 'P2 Classe entière', 'P2 Groupe réduit', 'Total 2 ans'],
                groupedHeader: {
                    row1: [
                        { label: 'Enseignements', rowspan: 2 },
                        { label: 'PREMIÈRE ANNÉE', colspan: 3 },
                        { label: 'DEUXIÈME ANNÉE', colspan: 3 },
                        { label: 'TOTAL SUR 2 ANS', rowspan: 2 }
                    ],
                    row2: ['Total', 'Dont en classe entière', 'Dont en groupe à effectif réduit (a)', 'Total', 'Dont en classe entière', 'Dont en groupe à effectif réduit (a)']
                },
                rows: [
                    { cells: ['ENSEIGNEMENTS PROFESSIONNELS', '551', '', '', '494', '', '', '1 045'], style: 'section' },
                    { cells: ['Enseignement professionnel', '333,5', '58', '275,5', '312', '52', '260', '645,5'], style: 'normal' },
                    { cells: ['Enseignement professionnel et français en co-intervention (b)', '43,5', '43,5', '0', '39', '39', '0', '82,5'], style: 'normal' },
                    { cells: ['Enseignement professionnel et mathématiques en co-intervention (b)', '43,5', '43,5', '0', '39', '39', '0', '82,5'], style: 'normal' },
                    { cells: ['Réalisation d\'un chef d\'œuvre (c)', '87', '', '', '78', '', '', '165'], style: 'normal' },
                    { cells: ['Prévention-santé-environnement', '43,5', '0', '43,5', '26', '0', '26', '69,5'], style: 'normal' },
                    { cells: ['ENSEIGNEMENTS GÉNÉRAUX', '246,5', '', '', '221', '', '', '467,5'], style: 'section' },
                    { cells: ['Français, histoire-géographie', '43,5', '14,5', '29', '39', '13', '26', '82,5'], style: 'normal' },
                    { cells: ['Enseignement moral et civique', '14,5', '0', '14,5', '13', '0', '13', '27,5'], style: 'normal' },
                    { cells: ['Mathématiques - Physique-chimie', '43,5', '14,5', '29', '39', '13', '26', '82,5'], style: 'normal' },
                    { cells: ['Langue vivante', '43,5', '14,5', '29', '39', '13', '26', '82,5'], style: 'normal' },
                    { cells: ['Arts appliqués et culture artistique', '29', '14,5', '14,5', '26', '13', '13', '55'], style: 'normal' },
                    { cells: ['Education physique et sportive', '72,5', '72,5', '0', '65', '65', '0', '137,5'], style: 'normal' },
                    { cells: ['CONSOLIDATION, ACCOMPAGNEMENT PERSONNALISÉ ET ACCOMPAGNEMENT AU CHOIX D\'ORIENTATION', '101,5', '43,5 (d)', '58', '91', '39', '52', '192,5'], style: 'section' },
                    { cells: ['TOTAL', '899', '', '', '806', '', '', '1705'], style: 'total' },
                    { cells: ['PÉRIODE DE FORMATION EN MILIEU PROFESSIONNEL', '6 à 7 semaines', '', '', '6 à 7 semaines', '', '', '12 à 14 semaines'], style: 'section' },
                ],
                footnotes: [
                    '(a) Horaire donnant droit au doublement de la dotation horaire professeur lorsque le seuil d\'effectifs est atteint.',
                    '(b) La dotation horaire professeur est égale au double du volume horaire élève.',
                    '(c) Horaire donnant droit au dédoublement de la dotation horaire professeur sans condition de seuil.',
                    '(d) Dédoublements possibles en fonction des besoins des élèves.',
                    '(*) Volume horaire élève identique quelle que soit la spécialité (1705 h).',
                ]
            }
        ]
    }
};

// Source officielle associée à chaque voie (affichée une seule fois, en bas
// de l'onglet, puisqu'elle couvre l'ensemble des tableaux de cette voie).
const HORAIRES_REG_SOURCES = {
    clg: 'https://www.education.gouv.fr/les-horaires-par-cycle-au-college-9884',
    lgt: {
        '2nd': 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000037202776',
        'Cycle terminal de la voie générale': 'https://eduscol.education.gouv.fr/5418/cycle-terminal-de-la-voie-generale',
        'Cycle terminal de la voie technologique': 'https://eduscol.education.gouv.fr/5643/cycle-terminal-de-la-voie-technologique'
    },
    lp: {
        'Bac Professionnel (BP)': 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000037833273/',
        "Certification d'Aptitude Professionnelle (CAP)": 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000037833254/'
    }
};

function openHorairesRegModal() {
    document.getElementById('horairesRegModal').classList.add('active');
    renderHorairesRegModal();
}

function closeHorairesRegModal() {
    document.getElementById('horairesRegModal').classList.remove('active');
}

function switchHorairesRegTab(tab) {
    currentHorairesRegTab = tab;
    currentHorairesRegNiveau = null;
    currentHorairesRegFiliere = null;
    renderHorairesRegModal();
}

function switchHorairesRegNiveau(niveau) {
    currentHorairesRegNiveau = niveau;
    currentHorairesRegFiliere = null;
    renderHorairesRegModal();
}

function switchHorairesRegFiliere(filiere) {
    currentHorairesRegFiliere = filiere;
    renderHorairesRegModal();
}

// Construit le HTML d'une ligne de tableau : ligne normale [libellé, valeur],
// ou ligne de section / sous-section (titre en gras, sur toute la largeur).
function buildHorairesRegRowHtml(row, colCount) {
    if (row.section !== undefined) {
        return `<tr class="horaires-reg-section-row"><td colspan="${colCount}">${row.section}</td></tr>`;
    }
    if (row.subsection !== undefined) {
        return `<tr class="horaires-reg-subsection-row"><td colspan="${colCount}">${row.subsection}</td></tr>`;
    }
    if (row.cells !== undefined) {
        const cls = row.style === 'section' ? 'horaires-reg-section-row-alt'
            : (row.style === 'total' ? 'horaires-reg-total-row' : '');
        return `<tr class="${cls}">${row.cells.map(cell => `<td>${cell || '—'}</td>`).join('')}</tr>`;
    }
    return `<tr>${row.map(cell => `<td>${cell || '—'}</td>`).join('')}</tr>`;
}

// En-tête de tableau standard (une ligne), ou en-tête groupé sur deux lignes
// avec colonnes fusionnées (ex : « 1re année / 2e année / total »).
function buildHorairesRegHeaderHtml(table) {
    if (table.groupedHeader) {
        const row1 = table.groupedHeader.row1.map(c =>
            `<th ${c.colspan ? `colspan="${c.colspan}"` : ''} ${c.rowspan ? `rowspan="${c.rowspan}"` : ''}>${c.label}</th>`
        ).join('');
        const row2 = table.groupedHeader.row2.map(h => `<th>${h}</th>`).join('');
        return `<tr>${row1}</tr><tr>${row2}</tr>`;
    }
    return `<tr>${table.headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
}

function buildHorairesRegTablesHtml(tables) {
    if (!tables || tables.length === 0) return '';
    return tables.map(table => `
        <h3 style="font-size: 1rem; color: var(--primary); margin: 18px 0 8px;">${table.title}</h3>
        <div class="table-container">
            <table>
                <thead>
                    ${buildHorairesRegHeaderHtml(table)}
                </thead>
                <tbody>
                    ${table.rows.map(row => buildHorairesRegRowHtml(row, table.headers.length)).join('')}
                </tbody>
            </table>
        </div>
        ${table.note ? `<p style="font-style: italic; color: var(--text-muted); font-size: 0.85rem; margin-top: 8px;">${table.note}</p>` : ''}
        ${table.extraNotes && table.extraNotes.length > 0 ? `
            <div style="margin-top: 8px; font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">
                ${table.extraNotes.map(n => `<p style="margin: 0;">${n}</p>`).join('')}
            </div>
        ` : ''}
        ${table.footnotes && table.footnotes.length > 0 ? `
            <div style="margin-top: 10px; font-size: 0.8rem; color: var(--text-muted); line-height: 1.6;">
                ${table.footnotes.map(fn => `<p style="margin: 0;">${fn}</p>`).join('')}
            </div>
        ` : ''}
    `).join('');
}

// Le contenu d'une voie est soit un tableau de tableaux (affichage direct, cas
// du Collège), soit un objet de sous-onglets « niveau » (cas du Lycée), chaque
// niveau pouvant lui-même contenir des sous-onglets « filière ».
// Le contenu d'un niveau sans filière est soit un simple tableau de tableaux
// (cas déjà existant), soit une liste de « sections » mêlant tableaux et
// groupes de sous-onglets intercalés (ex : un tableau, puis un choix de série
// technologique, puis un autre tableau).
function buildHorairesRegContentHtml(items) {
    if (!items || items.length === 0) return '<p class="empty-state">Contenu à venir.</p>';
    const isSectioned = items[0] && items[0].kind !== undefined;
    if (!isSectioned) return buildHorairesRegTablesHtml(items);

    return items.map(section => {
        if (section.kind === 'subtabs') {
            const tabKeys = Object.keys(section.tabs);
            if (!currentHorairesRegFiliere || !tabKeys.includes(currentHorairesRegFiliere)) {
                currentHorairesRegFiliere = tabKeys[0];
            }
            const tabsHtml = tabKeys.map(k =>
                `<button class="mode-btn ${k === currentHorairesRegFiliere ? 'active' : ''}" onclick="switchHorairesRegFiliere('${k.replace(/'/g, "\\'")}')">${k}</button>`
            ).join('');
            const subTables = section.tabs[currentHorairesRegFiliere];
            return `
                <div class="mode-selector" style="margin: 18px 0 16px;">${tabsHtml}</div>
                ${subTables && subTables.length > 0 ? buildHorairesRegTablesHtml(subTables) : `<p class="empty-state">Contenu à venir pour ${currentHorairesRegFiliere}.</p>`}
            `;
        }
        return buildHorairesRegTablesHtml(section.tables || []);
    }).join('');
}

function renderHorairesRegTabContent() {
    const area = document.getElementById('horairesRegTabContent');
    const data = HORAIRES_REG_TABLES[currentHorairesRegTab];

    let contentHtml;
    if (Array.isArray(data)) {
        contentHtml = data.length > 0
            ? buildHorairesRegTablesHtml(data)
            : `<p class="empty-state">Contenu à venir pour ${HORAIRES_REG_TAB_LABELS[currentHorairesRegTab]}.</p>`;
    } else {
        const niveaux = Object.keys(data);
        if (!currentHorairesRegNiveau || !niveaux.includes(currentHorairesRegNiveau)) {
            currentHorairesRegNiveau = niveaux[0];
        }
        const niveauTabsHtml = niveaux.map(n =>
            `<button class="mode-btn ${n === currentHorairesRegNiveau ? 'active' : ''}" onclick="switchHorairesRegNiveau('${n.replace(/'/g, "\\'")}')">${n}</button>`
        ).join('');

        const niveauContent = data[currentHorairesRegNiveau];
        let filiereTabsHtml = '';
        let tables;
        if (Array.isArray(niveauContent)) {
            // Ce niveau n'a pas de filière de premier niveau (sous-sous-onglet
            // classique) : mais s'il s'agit du format en sections (tableaux et
            // sous-onglets « Série » intercalés), la filière active est gérée
            // par buildHorairesRegContentHtml lui-même — il ne faut donc PAS
            // l'écraser ici, sous peine de revenir systématiquement à la
            // première série au moindre re-rendu.
            const isSectioned = niveauContent[0] && niveauContent[0].kind !== undefined;
            if (!isSectioned) {
                currentHorairesRegFiliere = null;
            }
            tables = niveauContent;
        } else {
            const filiereKeys = Object.keys(niveauContent);
            if (!currentHorairesRegFiliere || !filiereKeys.includes(currentHorairesRegFiliere)) {
                currentHorairesRegFiliere = filiereKeys[0];
            }
            filiereTabsHtml = `<div class="mode-selector" style="margin-bottom: 16px;">${filiereKeys.map(f =>
                `<button class="mode-btn ${f === currentHorairesRegFiliere ? 'active' : ''}" onclick="switchHorairesRegFiliere('${f.replace(/'/g, "\\'")}')">${f}</button>`
            ).join('')}</div>`;
            tables = niveauContent[currentHorairesRegFiliere];
        }

        contentHtml = `
            <div class="mode-selector" style="margin-bottom: 12px;">${niveauTabsHtml}</div>
            ${filiereTabsHtml}
            ${buildHorairesRegContentHtml(tables)}
        `;
    }

    const sourceEntry = HORAIRES_REG_SOURCES[currentHorairesRegTab];
    const source = (sourceEntry && typeof sourceEntry === 'object')
        ? sourceEntry[currentHorairesRegNiveau]
        : sourceEntry;
    const sourceHtml = source ? `<p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 16px; border-top: 1px solid var(--border); padding-top: 10px;">Source : <a href="${source}" target="_blank" rel="noopener noreferrer" style="color: var(--primary);">${source}</a></p>` : '';

    area.innerHTML = contentHtml + sourceHtml;
}

function renderHorairesRegModal() {
    const container = document.getElementById('horairesRegContent');
    const tabsHtml = Object.keys(HORAIRES_REG_TAB_LABELS).map(key =>
        `<button class="mode-btn ${key === currentHorairesRegTab ? 'active' : ''}" onclick="switchHorairesRegTab('${key}')">${HORAIRES_REG_TAB_LABELS[key]}</button>`
    ).join('');

    container.innerHTML = `
        <div class="mode-selector" style="margin-bottom: 16px;">${tabsHtml}</div>
        <div id="horairesRegTabContent"></div>
    `;
    renderHorairesRegTabContent();
}

function deleteService(disc, sIndex) {
    if (confirm("Voulez-vous vraiment supprimer ce service ? Cette action est irréversible.")) {
        dataStore[disc].services.splice(sIndex, 1);
        renderApp();
    }
}

// Noyau du renommage (sans boîte de dialogue ni rendu) : utilisé par l'interface et l'import des modifications du téléphone
function applyTeacherRename(disc, oldName, newName) {
    const data = dataStore[disc];
    if (!data || !data.teachers.includes(oldName) || data.teachers.includes(newName)) return false;
    data.teachers[data.teachers.indexOf(oldName)] = newName;
    if (data.ares && data.ares[oldName] !== undefined) {
        data.ares[newName] = data.ares[oldName];
        delete data.ares[oldName];
    }
    if (data.apports && data.apports[oldName] !== undefined) {
        data.apports[newName] = data.apports[oldName];
        delete data.apports[oldName];
    }

    // Services de cette discipline, et options d'autres disciplines rattachées à celle-ci
    Object.keys(dataStore).forEach(d => {
        (dataStore[d].services || []).forEach(service => {
            const concerned = d === disc || (Array.isArray(service.assignedDisciplines) && service.assignedDisciplines.includes(disc));
            if (!concerned) return;
            if (service.allocations && Object.prototype.hasOwnProperty.call(service.allocations, oldName)) {
                service.allocations[newName] = service.allocations[oldName];
                delete service.allocations[oldName];
            }
            if (Array.isArray(service.assignedTeachers)) {
                service.assignedTeachers = service.assignedTeachers.map(t => t === oldName ? newName : t);
            }
        });
    });

    // Coordonnateurs
    coordinators.forEach(e => {
        if (!(e.discs || []).includes(disc)) return;
        if (e.teacher === oldName) e.teacher = newName;
        (e.coords || []).forEach(c => { if (c.teacher === oldName) c.teacher = newName; });
    });

    // Groupes de co-enseignement
    (coEnseignementGroups || []).forEach(g => {
        (g.members || []).forEach(m => {
            if (m.disc === disc && m.teacher === oldName) m.teacher = newName;
        });
    });
    return true;
}

function applyTeacherAdd(disc, name, ors) {
    const data = dataStore[disc];
    if (!data || !name || data.teachers.includes(name)) return false;
    data.teachers.push(name);
    if (!data.apports) data.apports = {};
    data.apports[name] = (ors === undefined || ors === null || isNaN(parseFloat(ors))) ? 18 : parseFloat(ors);
    return true;
}

function renameTeacher(disc, tIndex) {
    const data = dataStore[disc];
    const oldName = data.teachers[tIndex];
    const input = prompt("Nouveau nom de l'enseignant :", oldName);
    if (input === null) return;
    const newName = input.trim();
    if (!newName || newName === oldName) return;
    if (data.teachers.includes(newName)) {
        alert(`Un enseignant nommé « ${newName} » existe déjà dans cette discipline.`);
        return;
    }
    applyTeacherRename(disc, oldName, newName);
    renderApp();
}

// ============================================================
// Import des modifications faites sur le téléphone (VectisDHG Compagnon)
// Le Compagnon exporte un petit fichier de modifications ; ici, chaque modification est
// comparée à l'état actuel (détection des conflits) puis appliquée après validation.
// ============================================================
let pendingDelta = null;   // { meta, items: [{ op, status, current, checked, text, detail }] }

function deltaNum(v) { return parseFloat(v) || 0; }
function deltaOrs(data, t) { return (data.apports && data.apports[t] !== undefined) ? deltaNum(data.apports[t]) : 18; }
function deltaFmt(v) { return (Math.round(deltaNum(v) * 100) / 100).toLocaleString('fr-FR'); }

function deltaFindService(op) {
    const list = (dataStore[op.disc] && dataStore[op.disc].services) || [];
    const same = sv => (sv.name || '') === (op.svc || '') && (sv.level || '') === (op.level || '');
    if (list[op.sIndex] && same(list[op.sIndex])) return { index: op.sIndex, svc: list[op.sIndex] };
    const idx = list.findIndex(same);
    return idx >= 0 ? { index: idx, svc: list[idx] } : null;
}

function evaluateDelta(ops) {
    const v2r = {};   // disc -> { nomVirtuel: nomRéel | null (nouvel enseignant) }
    const virt = d => {
        if (!v2r[d]) {
            v2r[d] = {};
            ((dataStore[d] && dataStore[d].teachers) || []).forEach(t => { v2r[d][t] = t; });
        }
        return v2r[d];
    };
    // Si un enseignant a été renommé plus loin dans la même liste (cas d'un fichier déjà importé), on suit le nouveau nom
    const resolveName = (d, name, fromIdx) => {
        const m = virt(d);
        let cur = name;
        for (let n = 0; n < 10 && !Object.prototype.hasOwnProperty.call(m, cur); n++) {
            const rn = ops.slice(fromIdx + 1).find(o => o.k === 'trename' && o.disc === d && o.from === cur);
            if (!rn) break;
            cur = rn.to;
        }
        return cur;
    };
    return ops.map((op, opIdx) => {
        const it = { op, status: 'ok', current: null, text: '', detail: '' };
        const data = dataStore[op.disc];
        const disc = op.disc;
        if (!data) { it.status = 'missing'; it.text = `Discipline « ${disc} »`; it.detail = 'Discipline introuvable'; return it; }
        if (op.k === 'note') {
            it.text = `📝 Post-it — ${disc}`;
            const cur = data.note || '';
            it.current = cur;
            if (cur === (op.to || '')) it.status = 'done';
            else if (cur !== (op.from || '')) it.status = 'conflict';
            it.detail = (op.to || '').trim() ? `« ${(op.to || '').trim().slice(0, 90)}${(op.to || '').length > 90 ? '…' : ''} »` : 'Post-it vidé';
        } else if (op.k === 'alloc') {
            const found = deltaFindService(op);
            it.text = `⏱️ ${disc} › ${op.svc || '(sans intitulé)'}${op.level ? ' (' + op.level + ')' : ''} — ${op.teacher}`;
            const real = virt(disc)[resolveName(disc, op.teacher, opIdx)];
            if (!found) { it.status = 'missing'; it.detail = 'Service introuvable'; return it; }
            if (real === undefined) { it.status = 'missing'; it.detail = 'Enseignant introuvable'; return it; }
            const cur = real === null ? 0 : deltaNum(found.svc.allocations && found.svc.allocations[real]);
            it.current = cur;
            it.detail = `${deltaFmt(op.from)} h → ${deltaFmt(op.to)} h`;
            if (Math.abs(cur - deltaNum(op.to)) < 0.001) it.status = 'done';
            else if (Math.abs(cur - deltaNum(op.from)) >= 0.001) it.status = 'conflict';
        } else if (op.k === 'tadd') {
            it.text = `➕ Nouvel enseignant — ${disc}`;
            it.detail = `${op.name} (ORS ${deltaFmt(op.ors)} h)`;
            if (Object.prototype.hasOwnProperty.call(virt(disc), op.name)) it.status = 'done';
            else virt(disc)[op.name] = null;
        } else if (op.k === 'trename') {
            it.text = `✏️ Enseignant renommé — ${disc}`;
            it.detail = `${op.from} → ${op.to}`;
            const m = virt(disc);
            if (Object.prototype.hasOwnProperty.call(m, op.to) && !Object.prototype.hasOwnProperty.call(m, op.from)) it.status = 'done';
            else if (!Object.prototype.hasOwnProperty.call(m, op.from)) { it.status = 'missing'; it.detail += ' (enseignant introuvable)'; }
            else if (Object.prototype.hasOwnProperty.call(m, op.to)) { it.status = 'conflict'; it.detail += ' (ce nom existe déjà)'; it.current = op.to; }
            else { m[op.to] = m[op.from]; delete m[op.from]; }
        } else if (op.k === 'tors') {
            it.text = `🎓 ORS — ${disc} › ${op.teacher}`;
            it.detail = `${deltaFmt(op.from)} h → ${deltaFmt(op.to)} h`;
            const real = virt(disc)[resolveName(disc, op.teacher, opIdx)];
            if (real === undefined) { it.status = 'missing'; it.detail += ' (enseignant introuvable)'; return it; }
            const cur = real === null ? 18 : deltaOrs(data, real);
            it.current = cur;
            if (Math.abs(cur - deltaNum(op.to)) < 0.001) it.status = 'done';
            else if (Math.abs(cur - deltaNum(op.from)) >= 0.001) it.status = 'conflict';
        } else { it.status = 'missing'; it.text = 'Modification inconnue'; }
        return it;
    });
}

function handleDeltaFile(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
        try {
            const o = JSON.parse(ev.target.result);
            if (!o || o.format !== 'vectis-modifications' || !Array.isArray(o.ops)) throw new Error('format');
            pendingDelta = { meta: o, items: evaluateDelta(o.ops) };
            pendingDelta.items.forEach(it => { it.checked = it.status === 'ok'; });
            renderDeltaModal();
            document.getElementById('deltaModal').classList.add('active');
        } catch (err) {
            alert("Ce fichier n'est pas un fichier de modifications du Compagnon.");
        }
    };
    reader.readAsText(file);
}

function closeDeltaModal() { document.getElementById('deltaModal').classList.remove('active'); pendingDelta = null; }

function renderDeltaModal() {
    const esc = escapeStructureHtml;
    const box = document.getElementById('deltaContent');
    if (!pendingDelta) { box.innerHTML = ''; return; }
    const { meta, items } = pendingDelta;
    const cnt = st => items.filter(i => i.status === st).length;
    const nChecked = items.filter(i => i.checked).length;
    const myName = (epleIdentity.name || '').trim(), theirName = ((meta.eple && meta.eple.name) || '').trim();
    const warnEple = myName && theirName && myName !== theirName
        ? `<div class="delta-warn">⚠ Ce fichier provient de « ${esc(theirName)} », le projet ouvert est « ${esc(myName)} ».</div>` : '';
    const label = { ok: '', done: 'Déjà appliquée', conflict: 'Conflit', missing: 'Impossible' };
    const rows = items.map((it, i) => {
        const can = it.status === 'ok' || it.status === 'conflict';
        let extra = '';
        if (it.status === 'conflict') {
            if (it.op.k === 'note') extra = `Valeur actuelle : « ${esc((it.current || '').slice(0, 80))} »`;
            else if (it.op.k === 'trename') extra = 'Le nouveau nom existe déjà';
            else extra = `Valeur actuelle sur l'ordinateur : ${esc(deltaFmt(it.current))} h (le téléphone partait de ${esc(deltaFmt(it.op.from))} h)`;
        }
        return `<label class="delta-row delta-${it.status}">
            <input type="checkbox" ${it.checked ? 'checked' : ''} ${can ? '' : 'disabled'} onchange="pendingDelta.items[${i}].checked = this.checked; renderDeltaModal();">
            <span class="delta-main"><strong>${esc(it.text)}</strong><br><span class="delta-detail">${esc(it.detail)}</span>${extra ? `<br><span class="delta-extra">${extra}</span>` : ''}</span>
            ${label[it.status] ? `<span class="delta-tag delta-tag-${it.status}">${label[it.status]}</span>` : ''}
        </label>`;
    }).join('');
    const when = meta.createdAt ? new Date(meta.createdAt).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : '';
    box.innerHTML = `${warnEple}
        <p class="delta-intro">${items.length} modification${items.length > 1 ? 's' : ''} préparée${items.length > 1 ? 's' : ''} sur le téléphone${when ? ` (${esc(when)})` : ''}. Vérifiez avant d'appliquer : ${cnt('ok')} à appliquer${cnt('conflict') ? `, <strong>${cnt('conflict')} en conflit</strong> (non cochée${cnt('conflict') > 1 ? 's' : ''} par défaut)` : ''}${cnt('done') ? `, ${cnt('done')} déjà appliquée${cnt('done') > 1 ? 's' : ''}` : ''}${cnt('missing') ? `, ${cnt('missing')} impossible${cnt('missing') > 1 ? 's' : ''}` : ''}.</p>
        <div class="delta-list">${rows}</div>
        <div class="delta-actions"><button class="btn-secondary" onclick="closeDeltaModal()">Annuler</button><button class="btn-primary" ${nChecked ? '' : 'disabled'} onclick="applyDelta()">Appliquer ${nChecked} modification${nChecked > 1 ? 's' : ''}</button></div>`;
}

function applyDelta() {
    if (!pendingDelta) return;
    let applied = 0, failed = 0;
    pendingDelta.items.forEach(it => {
        if (!it.checked) return;
        const op = it.op, data = dataStore[op.disc];
        let okk = false;
        if (data) {
            if (op.k === 'note') {
                if ((op.to || '').trim()) data.note = op.to; else delete data.note;
                okk = true;
            } else if (op.k === 'alloc') {
                const f = deltaFindService(op);
                if (f && data.teachers.includes(op.teacher)) {
                    if (!f.svc.allocations) f.svc.allocations = {};
                    f.svc.allocations[op.teacher] = deltaNum(op.to);
                    okk = true;
                }
            } else if (op.k === 'tadd') okk = applyTeacherAdd(op.disc, op.name, op.ors);
            else if (op.k === 'trename') okk = applyTeacherRename(op.disc, op.from, op.to);
            else if (op.k === 'tors') {
                if (data.teachers.includes(op.teacher)) {
                    if (!data.apports) data.apports = {};
                    data.apports[op.teacher] = deltaNum(op.to);
                    okk = true;
                }
            }
        }
        if (okk) applied++; else failed++;
    });
    closeDeltaModal();
    renderApp();
    showAppToast(failed ? `${applied} modification(s) appliquée(s), ${failed} ignorée(s)` : `✓ ${applied} modification${applied > 1 ? 's' : ''} appliquée${applied > 1 ? 's' : ''}`, failed > 0);
}

function deleteTeacher(disc, tIndex) {
    if (confirm("Voulez-vous vraiment supprimer cet enseignant ? Cette action est irréversible.")) {
        const teacherName = dataStore[disc].teachers[tIndex];
        dataStore[disc].teachers.splice(tIndex, 1);
        if (dataStore[disc].apports) {
            delete dataStore[disc].apports[teacherName];
        }
        Object.keys(dataStore).forEach(d => {
            dataStore[d].services.forEach(service => {
                if (service.allocations) delete service.allocations[teacherName];
            });
            if (dataStore[d].apports) delete dataStore[d].apports[teacherName];
            if (dataStore[d].ares) delete dataStore[d].ares[teacherName];
        });
        renderApp();
    }
}
// ------------------------------------------------------------------
// Historique des modifications — à chaque clic sur « Sauvegarder », compare
// l'état actuel à celui de la dernière sauvegarde (ou du dernier chargement)
// et enregistre un résumé lisible de ce qui a changé. Conservé dans le
// fichier de sauvegarde lui-même, pour s'accumuler au fil de l'année.
// ------------------------------------------------------------------

let changeHistory = [];
let lastSavedSnapshot = null;

function captureHistorySnapshot() {
    return JSON.parse(JSON.stringify({
        epleName: epleIdentity && epleIdentity.name,
        hp: dotationGlobal && dotationGlobal.hp,
        hsa: dotationGlobal && dotationGlobal.hsa,
        levels: levels,
        dataStore: dataStore
    }));
}

// À appeler après tout chargement (import DHG initial ou rechargement d'une
// sauvegarde) : établit la base de comparaison pour la prochaine sauvegarde,
// pour ne pas considérer les données qui viennent d'être chargées comme des
// « changements ».
function resetHistoryBaseline() {
    lastSavedSnapshot = captureHistorySnapshot();
}

function computeHistoryChanges(oldSnap, newSnap) {
    const changes = [];
    if (!oldSnap || !newSnap) return changes;

    if ((oldSnap.epleName || '') !== (newSnap.epleName || '')) {
        changes.push(`Nom de l'établissement modifié : « ${oldSnap.epleName || '(vide)'} » → « ${newSnap.epleName || '(vide)'} ».`);
    }
    if ((oldSnap.hp || 0) !== (newSnap.hp || 0)) {
        changes.push(`Heures Postes (HP) modifiées : ${oldSnap.hp || 0} → ${newSnap.hp || 0}.`);
    }
    if ((oldSnap.hsa || 0) !== (newSnap.hsa || 0)) {
        changes.push(`HSA modifiées : ${oldSnap.hsa || 0} → ${newSnap.hsa || 0}.`);
    }

    const oldLevels = oldSnap.levels || [];
    const newLevels = newSnap.levels || [];
    oldLevels.filter(l => !newLevels.includes(l)).forEach(l => changes.push(`Niveau « ${l} » supprimé.`));
    newLevels.filter(l => !oldLevels.includes(l)).forEach(l => changes.push(`Niveau « ${l} » ajouté.`));

    const oldDS = oldSnap.dataStore || {};
    const newDS = newSnap.dataStore || {};
    const allDiscs = new Set([...Object.keys(oldDS), ...Object.keys(newDS)]);

    allDiscs.forEach(disc => {
        const oldDisc = oldDS[disc];
        const newDisc = newDS[disc];
        if (!oldDisc && newDisc) { changes.push(`Discipline « ${disc} » ajoutée.`); return; }
        if (oldDisc && !newDisc) { changes.push(`Discipline « ${disc} » supprimée.`); return; }
        if (!oldDisc || !newDisc) return;

        const oldTeachers = oldDisc.teachers || [];
        const newTeachers = newDisc.teachers || [];
        oldTeachers.filter(t => !newTeachers.includes(t)).forEach(t => changes.push(`Enseignant « ${t} » retiré de ${disc}.`));
        newTeachers.filter(t => !oldTeachers.includes(t)).forEach(t => changes.push(`Enseignant « ${t} » ajouté en ${disc}.`));

        // Services : appariement par (nom + niveau), les services n'ayant pas
        // d'identifiant stable dans le modèle de données.
        const oldServices = oldDisc.services || [];
        const newServices = newDisc.services || [];
        const keyOf = s => `${s.name}::${s.level}`;
        const oldByKey = new Map(oldServices.map(s => [keyOf(s), s]));
        const newByKey = new Map(newServices.map(s => [keyOf(s), s]));

        oldByKey.forEach((s, key) => {
            if (!newByKey.has(key)) changes.push(`Service « ${s.name} » (${disc}, ${s.level}) supprimé.`);
        });
        newByKey.forEach((s, key) => {
            if (!oldByKey.has(key)) changes.push(`Service « ${s.name} » (${disc}, ${s.level}) ajouté.`);
        });
        oldByKey.forEach((oldS, key) => {
            const newS = newByKey.get(key);
            if (!newS) return;
            if ((oldS.hours || 0) !== (newS.hours || 0)) {
                changes.push(`Volume horaire de « ${oldS.name} » (${disc}) modifié : ${oldS.hours || 0}h → ${newS.hours || 0}h.`);
            }
            if ((oldS.classes || 0) !== (newS.classes || 0)) {
                changes.push(`Nombre de classes de « ${oldS.name} » (${disc}) modifié : ${oldS.classes || 0} → ${newS.classes || 0}.`);
            }
            if (!!oldS.isCoEnseignement !== !!newS.isCoEnseignement) {
                changes.push(`Co-enseignement ${newS.isCoEnseignement ? 'activé' : 'désactivé'} pour « ${oldS.name} » (${disc}).`);
            }
            const oldAlloc = oldS.allocations || {};
            const newAlloc = newS.allocations || {};
            const allTeachers = new Set([...Object.keys(oldAlloc), ...Object.keys(newAlloc)]);
            allTeachers.forEach(t => {
                const ov = oldAlloc[t] || 0;
                const nv = newAlloc[t] || 0;
                if (ov !== nv) {
                    if (ov === 0) changes.push(`« ${t} » affecté à « ${oldS.name} » (${disc}) : ${nv}h.`);
                    else if (nv === 0) changes.push(`« ${t} » retiré de « ${oldS.name} » (${disc}) (était ${ov}h).`);
                    else changes.push(`Heures de « ${t} » sur « ${oldS.name} » (${disc}) modifiées : ${ov}h → ${nv}h.`);
                }
            });
        });
    });

    return changes;
}

// À appeler juste avant l'export du fichier de sauvegarde : compare l'état
// actuel à la dernière base connue, enregistre un point d'historique si des
// changements sont détectés, puis met à jour la base pour la prochaine fois.
function recordHistoryPoint() {
    const newSnap = captureHistorySnapshot();
    if (lastSavedSnapshot) {
        const changes = computeHistoryChanges(lastSavedSnapshot, newSnap);
        if (changes.length > 0) {
            changeHistory.push({
                id: 'h-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
                date: new Date().toISOString(),
                changes
            });
        }
    }
    lastSavedSnapshot = newSnap;
}

function openHistoryModal() {
    document.getElementById('historyModal').classList.add('active');
    renderHistoryModal();
}

function closeHistoryModal() {
    document.getElementById('historyModal').classList.remove('active');
}

function formatHistoryDate(iso) {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }) + ' à ' +
        d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function renderHistoryModal() {
    const container = document.getElementById('historyContent');
    if (!changeHistory || changeHistory.length === 0) {
        container.innerHTML = '<p class="empty-state">Aucun historique pour l\'instant. Un point est enregistré automatiquement à chaque sauvegarde comportant des changements.</p>';
        return;
    }

    const sorted = changeHistory.slice().reverse();

    container.innerHTML = `
        <div class="card-hint">Un point est ajouté automatiquement à chaque sauvegarde comportant des changements. Vous pouvez supprimer une ligne si besoin.</div>
        <div class="table-container" style="margin-top: 12px;">
            <table>
                <thead><tr><th style="white-space: nowrap;">Date</th><th>Modifications</th><th></th></tr></thead>
                <tbody>
                    ${sorted.map(entry => `
                        <tr>
                            <td style="white-space: nowrap; vertical-align: top;">${formatHistoryDate(entry.date)}</td>
                            <td>
                                <ul style="margin: 0; padding-left: 18px;">
                                    ${entry.changes.map(c => `<li>${c}</li>`).join('')}
                                </ul>
                            </td>
                            <td style="vertical-align: top; text-align: center;">
                                <button type="button" class="delete-btn-icon" title="Supprimer cette ligne" onclick="deleteHistoryEntry('${entry.id}')">✕</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function deleteHistoryEntry(id) {
    if (!confirm("Supprimer cette ligne de l'historique ? Cette action est irréversible.")) return;
    changeHistory = changeHistory.filter(e => e.id !== id);
    renderHistoryModal();
}

function printHistoryContent() {
    triggerPrint();
}

// Pondération d'un enseignant (méthode alignée sur STSWeb) :
//  - le coefficient 1,1 ne s'applique qu'aux 10 premières heures (soit 1 h de pondération au maximum) ;
//  - les autres coefficients (1,25, 1,5…) donnent (coefficient − 1) × heures ;
//  - si le nombre d'heures pondérées (P) dépasse l'ORS, la pondération est réduite au prorata ORS / P
//    (les heures supplémentaires ne sont pas pondérées).
function pondExtra(sums, t, data) {
    if (!pondEnabled()) return 0;
    const ors = (data && data.apports && data.apports[t] !== undefined) ? data.apports[t] : 18;
    const h11 = Math.min((sums[t] || 0) / 0.1, 10);
    let weightedHours = Math.max(h11, 0);
    let pond = Math.max(h11, 0) * 0.1;

    const h125 = sums['125:' + t] || 0;
    weightedHours += h125;
    pond += h125 * 0.25;

    const others = sums['x:' + t] || {};
    Object.keys(others).forEach(k => {
        weightedHours += others[k];
        pond += others[k] * (parseFloat(k) - 1);
    });

    if (weightedHours > ors && weightedHours > 0) {
        pond = pond * Math.max(ors, 0) / weightedHours;
    }
    return pond;
}

// Affichage des heures : décimal (1,25 h) ou sexagésimal (1h15), par discipline
function fmtHours(value, data, signed, decimals) {
    const v = value || 0;
    if (data && data.hoursFormat === 'sexa') {
        let totalMin = Math.round(Math.abs(v) * 60);
        const h = Math.floor(totalMin / 60);
        const m = totalMin % 60;
        const sign = (v < 0 && totalMin > 0) ? '-' : ((signed && totalMin > 0) ? '+' : '');
        return `${sign}${h}h${String(m).padStart(2, '0')}`;
    }
    const sign = (signed && v > 0) ? '+' : '';
    return `${sign}${v.toFixed(decimals)} h`;
}

function toggleHoursFormat(disc) {
    const d = dataStore[disc];
    if (!d) return;
    d.hoursFormat = d.hoursFormat === 'sexa' ? 'dec' : 'sexa';
    renderApp();
}

function openPondInfoModal() {
    document.getElementById('pondInfoContent').innerHTML = `
        <div class="pond-info">
            <p class="pond-info-source">Référence : <a href="https://www.education.gouv.fr/bo/15/Hebdo14/MENH1506031C.htm?cid_bo=87302" target="_blank" rel="noopener noreferrer">https://www.education.gouv.fr/bo/15/Hebdo14/MENH1506031C.htm?cid_bo=87302</a></p>
            <section class="pond-info-section">
                <h3>Règles de calcul</h3>
                <div class="pond-rule">
                    <div class="pond-rule-title"><span class="pond-chip">1,1</span> Pondération 1,1</div>
                    <p>+0,1 h par heure enseignée, <strong>limité aux 10 premières heures</strong> : la pondération 1,1 est donc plafonnée à 1 h.</p>
                </div>
                <div class="pond-rule">
                    <div class="pond-rule-title"><span class="pond-chip">1,25</span> Pondération 1,25 et autres coefficients</div>
                    <p>+0,25 h par heure pour le coefficient 1,25, soit + (coefficient − 1) × heures pour tout autre coefficient (1,5, etc.), sans plafond.</p>
                </div>
                <div class="pond-rule">
                    <div class="pond-rule-title"><span class="pond-chip">ORS</span> Limite du maximum de service</div>
                    <p>On note <strong>P</strong> le nombre d'heures pondérées : heures en 1,1 (10 au maximum) + heures en 1,25 + heures aux autres coefficients.</p>
                    <p>Si <strong>P est inférieur ou égal à l'ORS</strong>, la pondération n'est pas modifiée.</p>
                    <p>Si <strong>P dépasse l'ORS</strong>, la pondération est réduite au prorata :</p>
                    <div class="pond-formula">Pondération × ORS ÷ P</div>
                    <p>Les heures non pondérées n'entrent pas dans P.</p>
                </div>
                <div class="pond-rule">
                    <div class="pond-rule-title"><span class="pond-chip">Total</span> Totaux</div>
                    <p><strong>Total (brut + pondération)</strong> = heures attribuées + pondérations.</p>
                    <p><strong>HSA</strong> = Total − ORS.</p>
                </div>
            </section>

            <section class="pond-info-section">
                <h3>Exemple 1 : plafond du 1,1 et autre coefficient</h3>
                <p class="pond-example-intro">ORS 18 h. Services : <strong>14 h</strong> en 1,1 · <strong>5 h</strong> en 1,2 · <strong>3 h</strong> non pondérées.</p>
                <table class="pond-info-table">
                    <tr><td>Heures attribuées</td><td>14 + 5 + 3 = <strong>22 h</strong></td></tr>
                    <tr><td>Pondération 1,1</td><td>10 premières heures : 10 × 0,1 = <strong>1,00 h</strong></td></tr>
                    <tr><td>Pondération 1,2</td><td>5 × 0,2 = <strong>1,00 h</strong></td></tr>
                    <tr><td>Heures pondérées (P)</td><td>10 + 5 = 15 h, inférieur à l'ORS (18 h) : pas de réduction</td></tr>
                    <tr><td>Pondérations</td><td>1,00 + 1,00 = <strong>2,00 h</strong></td></tr>
                    <tr><td>Total (brut + pondération)</td><td>22 + 2,00 = <strong>24,00 h</strong></td></tr>
                    <tr><td>HSA</td><td>24,00 − 18 = <strong>+6,00 h</strong></td></tr>
                </table>
            </section>

            <section class="pond-info-section">
                <h3>Exemple 2 : 1,1 et 1,25 avec heures pondérées dans l'ORS</h3>
                <p class="pond-example-intro">ORS 15 h (agrégé). Services : <strong>14,5 h</strong> en 1,1 · <strong>3 h</strong> en 1,25.</p>
                <table class="pond-info-table">
                    <tr><td>Heures attribuées</td><td>14,5 + 3 = <strong>17,5 h</strong></td></tr>
                    <tr><td>Pondération 1,1</td><td>10 premières heures : 10 × 0,1 = <strong>1,00 h</strong></td></tr>
                    <tr><td>Pondération 1,25</td><td>3 × 0,25 = <strong>0,75 h</strong></td></tr>
                    <tr><td>Heures pondérées (P)</td><td>10 + 3 = 13 h, inférieur à l'ORS (15 h) : pas de réduction</td></tr>
                    <tr><td>Pondérations</td><td>1,00 + 0,75 = <strong>1,75 h</strong></td></tr>
                    <tr><td>Total (brut + pondération)</td><td>17,5 + 1,75 = <strong>19,25 h</strong></td></tr>
                    <tr><td>HSA</td><td>19,25 − 15 = <strong>+4,25 h</strong></td></tr>
                </table>
            </section>

            <section class="pond-info-section">
                <h3>Exemple 3 : heures pondérées au-delà de l'ORS (réduction au prorata)</h3>
                <p class="pond-example-intro">ORS 15 h (agrégé). Services : <strong>10 h</strong> en 1,25 · <strong>6 h</strong> en 1,1.</p>
                <table class="pond-info-table">
                    <tr><td>Heures attribuées</td><td>10 + 6 = <strong>16 h</strong></td></tr>
                    <tr><td>Pondération brute</td><td>10 × 0,25 + 6 × 0,1 = 2,5 + 0,6 = <strong>3,10 h</strong></td></tr>
                    <tr><td>Heures pondérées (P)</td><td>10 + 6 = 16 h, supérieur à l'ORS (15 h)</td></tr>
                    <tr><td>Pondérations</td><td>3,10 × 15 ÷ 16 = 2,90625 h, soit <strong>2,91 h</strong></td></tr>
                    <tr><td>Total (brut + pondération)</td><td>16 + 2,91 = <strong>18,91 h</strong></td></tr>
                    <tr><td>HSA</td><td>18,91 − 15 = <strong>+3,91 h</strong></td></tr>
                </table>
            </section>

            <p class="pond-info-note">En affichage sexagésimal, 1,75 h s'écrit 1h45 (arrondi à la minute).</p>
        </div>`;
    document.getElementById('pondInfoModal').classList.add('active');
}

function closePondInfoModal() {
    document.getElementById('pondInfoModal').classList.remove('active');
}

// ============================================================
// 👥 Prévision d'effectifs (annoncés par la DSDEN) et structure de la rentrée suivante
// ============================================================
let enrollmentForecast = { rentree: '', source: '', rows: {} };   // rows[niveau] = { current, forecast, divisions }

function normalizeEnrollment(o) {
    const out = { rentree: '', source: '', rows: {} };
    if (!o || typeof o !== 'object') return out;
    out.rentree = typeof o.rentree === 'string' ? o.rentree : '';
    out.source = typeof o.source === 'string' ? o.source : '';
    if (o.rows && typeof o.rows === 'object') {
        Object.keys(o.rows).forEach(l => {
            const r = o.rows[l] || {};
            const n = v => (v === '' || v === null || v === undefined || isNaN(parseFloat(v))) ? '' : parseFloat(v);
            out.rows[l] = { current: n(r.current), forecast: n(r.forecast), divisions: n(r.divisions) };
        });
    }
    return out;
}

function openEnrollmentModal() {
    renderEnrollmentContent();
    document.getElementById('enrollmentModal').classList.add('active');
}
function closeEnrollmentModal() { document.getElementById('enrollmentModal').classList.remove('active'); }

function setEnrollmentMeta(field, value) { enrollmentForecast[field] = value; }

function setEnrollmentField(i, field, value) {
    const l = levels[i];
    if (l === undefined) return;
    if (!enrollmentForecast.rows[l]) enrollmentForecast.rows[l] = { current: '', forecast: '', divisions: '' };
    const v = parseFloat(String(value).replace(',', '.'));
    enrollmentForecast.rows[l][field] = isNaN(v) || v < 0 ? '' : v;
    updateEnrollmentDerived();
}

// Volume horaire des services et nombre de divisions de la ventilation, par niveau
function getLevelServiceFigures() {
    const fig = {};
    Object.keys(dataStore).forEach(d => (dataStore[d].services || []).forEach(sv => {
        const classes = parseFloat(sv.classes) || 0, hours = parseFloat(sv.hours) || 0;
        const lv = getServiceLevels(sv);
        lv.forEach(l => {
            if (!fig[l]) fig[l] = { vol: 0, divisions: 0 };
            fig[l].vol += classes * hours / lv.length;
            if (!sv.isOptionnel && !sv.isSpecialite && !sv.isCoEnseignement) fig[l].divisions = Math.max(fig[l].divisions, classes);
        });
    }));
    return fig;
}

const fmtEnr = (n, d) => (n === null || n === undefined || n === '' || isNaN(n)) ? '—' : String(Math.round(n * Math.pow(10, d || 0)) / Math.pow(10, d || 0)).replace('.', ',');

function renderEnrollmentContent() {
    const esc = escapeStructureHtml;
    const box = document.getElementById('enrollmentContent');
    if (!levels.length) { box.innerHTML = '<p class="empty-state">Aucun niveau défini (Paramètres › Niveaux).</p>'; return; }
    const e = enrollmentForecast;
    const inp = (i, f, v) => `<input type="number" min="0" step="1" class="enr-input" value="${v === '' || v === undefined ? '' : v}" onchange="setEnrollmentField(${i}, '${f}', this.value)" oninput="setEnrollmentField(${i}, '${f}', this.value)">`;
    box.innerHTML = `
        <div class="enr-toolbar"><button class="btn-secondary" type="button" onclick="exportEnrollmentPdf()">📄 Exporter en PDF</button></div>
        <p class="enr-hint">Saisissez les effectifs annoncés par la DSDEN et la structure (nombre de divisions) prévue pour la rentrée suivante. Les données sont enregistrées avec le fichier.</p>
        <div class="enr-meta">
            <label>Rentrée scolaire <input type="text" class="enr-text" style="width:120px" placeholder="ex. 2027" value="${esc(e.rentree)}" oninput="setEnrollmentMeta('rentree', this.value)"></label>
            <label>Source / date de l'annonce <input type="text" class="enr-text" style="width:300px" placeholder="ex. Notification DSDEN du 12/02" value="${esc(e.source)}" oninput="setEnrollmentMeta('source', this.value)"></label>
        </div>
        <div class="table-wrapper"><table class="enr-table">
            <thead><tr>
                <th>Niveau</th>
                <th class="num">Effectif année en cours <small>(facultatif)</small></th>
                <th class="num">Effectif prévu <small>(DSDEN)</small></th>
                <th class="num">Évolution</th>
                <th class="num">Divisions prévues <small>(structure)</small></th>
                <th class="num">Élèves / division</th>
                <th class="num">Divisions dans la ventilation</th>
                <th class="num">H/E <small>(heures par élève)</small></th>
            </tr></thead>
            <tbody>${levels.map((l, i) => {
                const r = e.rows[l] || {};
                return `<tr><td><strong>${esc(l)}</strong></td>
                    <td class="num">${inp(i, 'current', r.current)}</td>
                    <td class="num">${inp(i, 'forecast', r.forecast)}</td>
                    <td class="num" id="enr-evo-${i}"></td>
                    <td class="num">${inp(i, 'divisions', r.divisions)}</td>
                    <td class="num" id="enr-ed-${i}"></td>
                    <td class="num" id="enr-div-${i}"></td>
                    <td class="num" id="enr-he-${i}"></td></tr>`;
            }).join('')}</tbody>
            <tfoot><tr class="enr-total"><td>Total</td><td class="num" id="enr-t-cur"></td><td class="num" id="enr-t-for"></td><td class="num" id="enr-t-evo"></td><td class="num" id="enr-t-divp"></td><td class="num" id="enr-t-ed"></td><td class="num" id="enr-t-div"></td><td class="num" id="enr-t-he"></td></tr></tfoot>
        </table></div>
        <div id="enr-notes" class="enr-notes"></div>`;
    updateEnrollmentDerived();
}

function updateEnrollmentDerived() {
    if (!document.getElementById('enrollmentModal').classList.contains('active') && !document.getElementById('enr-t-cur')) return;
    const fig = getLevelServiceFigures();
    const e = enrollmentForecast;
    const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
    const evo = (cur, fc) => {
        if (cur === '' || cur === undefined || fc === '' || fc === undefined) return '—';
        const d = fc - cur, p = cur > 0 ? d / cur * 100 : null;
        return `<span class="enr-evo ${d > 0 ? 'up' : d < 0 ? 'down' : ''}">${d > 0 ? '+' : ''}${fmtEnr(d, 0)}${p === null ? '' : ` (${d > 0 ? '+' : ''}${fmtEnr(p, 1)} %)`}</span>`;
    };
    let tCur = 0, tFor = 0, tDivP = 0, tDiv = 0, tVol = 0, anyCur = false, anyFor = false, anyDivP = false, bothCur = 0, bothFor = 0;
    levels.forEach((l, i) => {
        const r = e.rows[l] || {};
        const f = fig[l] || { vol: 0, divisions: 0 };
        const cur = r.current === '' || r.current === undefined ? null : r.current;
        const fc = r.forecast === '' || r.forecast === undefined ? null : r.forecast;
        const dv = r.divisions === '' || r.divisions === undefined ? null : r.divisions;
        if (cur !== null) { tCur += cur; anyCur = true; }
        if (fc !== null) { tFor += fc; anyFor = true; }
        if (dv !== null) { tDivP += dv; anyDivP = true; }
        tDiv += f.divisions; tVol += f.vol;
        if (cur !== null && fc !== null) { bothCur += cur; bothFor += fc; }
        set(`enr-evo-${i}`, evo(cur === null ? '' : cur, fc === null ? '' : fc));
        set(`enr-ed-${i}`, fc !== null && dv ? fmtEnr(fc / dv, 1) : '—');
        const ok = dv !== null && Math.abs(dv - f.divisions) < 0.004;
        set(`enr-div-${i}`, `${fmtEnr(f.divisions, 0)}${dv === null ? '' : (ok ? ' <span class="enr-ok" title="Conforme à la structure prévue">✓</span>' : ' <span class="enr-ko" title="Différent des divisions prévues">⚠</span>')}`);
        set(`enr-he-${i}`, fc ? fmtEnr(f.vol / fc, 2) + ' h' : '—');
    });
    set('enr-t-cur', anyCur ? fmtEnr(tCur, 0) : '—');
    set('enr-t-for', anyFor ? fmtEnr(tFor, 0) : '—');
    set('enr-t-evo', anyCur && anyFor ? evo(bothCur, bothFor) : '—');
    set('enr-t-divp', anyDivP ? fmtEnr(tDivP, 0) : '—');
    set('enr-t-ed', anyFor && tDivP ? fmtEnr(tFor / tDivP, 1) : '—');
    set('enr-t-div', fmtEnr(tDiv, 0));
    set('enr-t-he', anyFor && tFor ? fmtEnr(tVol / tFor, 2) + ' h' : '—');
    const dgh = (parseFloat(dotationGlobal.hp) || 0) + (parseFloat(dotationGlobal.hsa) || 0);
    const notes = [];
    if (anyFor && tFor > 0 && dgh > 0) notes.push(`DHG totale / effectif prévu : <strong>${fmtEnr(dgh / tFor, 2)} h par élève</strong> (${fmtEnr(dgh, 1)} h pour ${fmtEnr(tFor, 0)} élèves).`);
    notes.push('H/E par niveau = volume horaire des services du niveau (classes × volume classe) divisé par l\'effectif prévu. « Divisions dans la ventilation » = plus grand nombre de classes d\'un service courant du niveau (hors options, spécialités et co-enseignement).');
    set('enr-notes', notes.map(n => `<p>${n}</p>`).join(''));
}

function hasEnrollmentData() {
    return Object.values(enrollmentForecast.rows || {}).some(r => r && (r.forecast !== '' || r.divisions !== '' || r.current !== ''));
}

// Lignes du tableau de prévision d'effectifs (utilisées pour le PDF)
function computeEnrollmentRows() {
    const fig = getLevelServiceFigures();
    const num = v => (v === '' || v === undefined || v === null) ? null : v;
    const rows = levels.map(l => {
        const r = enrollmentForecast.rows[l] || {};
        const f = fig[l] || { vol: 0, divisions: 0 };
        const cur = num(r.current), fc = num(r.forecast), dv = num(r.divisions);
        return { label: l, cur, fc, dv, ventDiv: f.divisions, vol: f.vol };
    }).filter(r => r.cur !== null || r.fc !== null || r.dv !== null);
    const sum = k => rows.reduce((x, r) => x + (r[k] || 0), 0);
    const both = rows.filter(r => r.cur !== null && r.fc !== null);
    return {
        rows,
        hasCur: rows.some(r => r.cur !== null),
        total: {
            cur: rows.some(r => r.cur !== null) ? sum('cur') : null,
            fc: rows.some(r => r.fc !== null) ? sum('fc') : null,
            dv: rows.some(r => r.dv !== null) ? sum('dv') : null,
            ventDiv: sum('ventDiv'), vol: sum('vol'),
            bothCur: both.reduce((x, r) => x + r.cur, 0), bothFc: both.reduce((x, r) => x + r.fc, 0), hasBoth: both.length > 0
        }
    };
}

function exportEnrollmentPdf() {
    if (!hasEnrollmentData()) { alert("Aucun effectif renseigné : saisissez d'abord au moins un niveau."); return; }
    const sections = {};
    PRESENTATION_SECTIONS.forEach(([k]) => { sections[k] = (k === 'effectifs'); });
    generatePresentationPdf({ sections, disciplines: Object.keys(dataStore), levels: levels.slice(), bare: true });
}

// ============================================================
// Construire les services avec la structure de l'EPLE
// ============================================================
let currentStructureType = null;   // 'clg' | 'lgt' | 'lp'
let currentStructureLevelId = null;
const structureRowState = {};      // `${type}|${levelId}|${i}` -> { classes, disc, hours, created }
const structureLevelChoice = {};   // `${type}|${levelId}` -> niveau de l'application

const STRUCTURE_LP_WEEKS = 36;

// "4h30" -> 4.5 ; "1h + 1h" -> 2 ; "5 h 30" -> 5.5 ; "4 h (dont 1 h d'ETLV)" -> 4 ; sinon null
function parseStructureWeeklyHours(raw) {
    if (raw === undefined || raw === null) return null;
    const str = String(raw).trim();
    if (!str || /annuel|semaine|^total/i.test(str)) return null;
    const first = str.split(/\s+ou\s+/i)[0].replace(/\(.*?\)/g, '');
    const parts = first.split('+');
    let total = 0, found = false;
    parts.forEach(p => {
        const m = p.trim().match(/^(\d+(?:[.,]\d+)?)\s*(?:h|heures?)\s*(\d{1,2})?$/i);
        if (m) {
            found = true;
            total += parseFloat(m[1].replace(',', '.')) + (m[2] ? parseInt(m[2], 10) / 60 : 0);
        }
    });
    return found ? Math.round(total * 100) / 100 : null;
}

// "1 130" / "333,5" / "43,5 (d)" -> nombre ; sinon null
function parseStructureAnnualHours(raw) {
    if (raw === undefined || raw === null) return null;
    const str = String(raw).replace(/\(.*?\)/g, '').replace(/\s/g, '').replace(',', '.');
    if (!/^\d+(\.\d+)?$/.test(str)) return null;
    const n = parseFloat(str);
    return n > 0 ? n : null;
}

function cleanStructureName(name) {
    return String(name || '').replace(/(\s*\((?:[a-z]|\d)\))+\s*$/i, '').trim();
}

// Extrait d'une liste de tableaux les lignes d'une colonne (avec titres de section)
function extractStructureRows(tables, colIndex, annual) {
    const rows = [];
    let pendingHeadings = [];
    const flushHeading = h => { pendingHeadings = pendingHeadings.filter(x => x.level < h.level); pendingHeadings.push(h); };
    tables.forEach(table => {
        if (tables.length > 1 && table.title) {
            flushHeading({ level: 0, text: table.title });
        }
        (table.rows || []).forEach(item => {
            if (item.section !== undefined) { flushHeading({ level: 1, text: item.section }); return; }
            if (item.subsection !== undefined) { flushHeading({ level: 2, text: item.subsection }); return; }
            const isCells = item.cells !== undefined;
            const cells = isCells ? item.cells : item;
            if (isCells && item.style === 'section') { flushHeading({ level: 1, text: cells[0] }); return; }
            const name = cleanStructureName(cells[0]);
            if (!name || /^total/i.test(name) || /^période|^deux semaines/i.test(name)) return;
            let hours = annual ? parseStructureAnnualHours(cells[colIndex]) : parseStructureWeeklyHours(cells[colIndex]);
            if (hours === null) return;
            const raw = String(cells[colIndex]).trim();
            if (annual) hours = Math.round(hours / STRUCTURE_LP_WEEKS * 10) / 10;
            pendingHeadings.forEach(h => rows.push({ heading: h.text, level: h.level }));
            pendingHeadings = [];
            // Enseignements artistiques (arts plastiques + éducation musicale) : une ligne par enseignement
            if (!annual && /enseignements?\s+artistiques/i.test(name) && raw.includes('+')) {
                const parts = raw.split('+').map(p => parseStructureWeeklyHours(p.trim()));
                if (parts.length === 2 && parts.every(p => p !== null)) {
                    rows.push({ name: 'Éducation musicale', hours: parts[1], raw: `${parts[1]} h` });
                    rows.push({ name: 'Arts plastiques', hours: parts[0], raw: `${parts[0]} h` });
                    return;
                }
            }
            rows.push({ name, hours, raw: annual ? `${raw} h annuelles ÷ ${STRUCTURE_LP_WEEKS} semaines` : raw });
        });
    });
    return rows;
}

function getStructureLevels(type) {
    const T = HORAIRES_REG_TABLES;
    const L = [];
    if (type === 'clg') {
        L.push({ id: '6e', label: '6ème', hint: '6', rows: extractStructureRows([T.clg[0]], 1) });
        [['5e', '5ème', '5', 1], ['4e', '4ème', '4', 2], ['3e', '3ème', '3', 3]].forEach(([id, label, hint, col]) => {
            L.push({ id, label, hint, rows: extractStructureRows([T.clg[1]], col) });
        });
    } else if (type === 'lgt') {
        L.push({ id: '2gt', label: '2de GT', hint: '2', rows: extractStructureRows(T.lgt['2nd']['2nd GT'], 1) });
        L.push({ id: '2sthr', label: '2de GT STHR', hint: '2', rows: extractStructureRows(T.lgt['2nd']['2nd GT STHR'], 1) });
        const vg = T.lgt['Cycle terminal de la voie générale'];
        L.push({ id: '1g', label: '1re générale', hint: '1', rows: extractStructureRows(vg, 1) });
        L.push({ id: 'tg', label: 'Terminale générale', hint: 'T', rows: extractStructureRows(vg, 2) });
        const vt = T.lgt['Cycle terminal de la voie technologique'];
        const techTables = [];
        vt.forEach(sec => {
            if (sec.kind === 'subtabs') Object.keys(sec.tabs).forEach(k => (sec.tabs[k] || []).forEach(t => techTables.push(t)));
            else (sec.tables || []).forEach(t => techTables.push(t));
        });
        L.push({ id: '1t', label: '1re technologique', hint: '1', rows: extractStructureRows(techTables, 1) });
        L.push({ id: 'tt', label: 'Terminale technologique', hint: 'T', rows: extractStructureRows(techTables, 2) });
    } else if (type === 'lp') {
        const bp = T.lp['Bac Professionnel (BP)'];
        L.push({ id: 'bp2', label: 'Bac pro - Seconde', hint: '2', annual: true, rows: extractStructureRows(bp, 1, true) });
        L.push({ id: 'bp1', label: 'Bac pro - Première', hint: '1', annual: true, rows: extractStructureRows(bp, 2, true) });
        L.push({ id: 'bpt', label: 'Bac pro - Terminale', hint: 'T', annual: true, rows: extractStructureRows(bp, 3, true) });
        const cap = T.lp["Certification d'Aptitude Professionnelle (CAP)"];
        L.push({ id: 'cap1', label: 'CAP - 1re année', hint: '1', annual: true, rows: extractStructureRows(cap, 1, true) });
        L.push({ id: 'cap2', label: 'CAP - 2e année', hint: '2', annual: true, rows: extractStructureRows(cap, 4, true) });
    }
    // Ajustements propres à l'application : pas de sous-titres, EMC et LVA / LVB distinguées au lycée
    L.forEach(l => {
        l.rows = l.rows.filter(r => !(r.heading !== undefined && r.level === 2));
        if (type === 'lgt') l.rows = adjustLgtStructureRows(l.rows);
    });
    return L.filter(l => l.rows.some(r => r.heading === undefined));
}

// LGT : LVA et LVB sur deux lignes (3 h et 2,5 h pour 5 h 30 en seconde, répartition proportionnelle sinon,
// à arrondir à la demi-heure) et ajout de l'EMC (0,5 h) dans les enseignements communs.
function adjustLgtStructureRows(rows) {
    const out = [];
    rows.forEach(r => {
        if (r.heading === undefined && /^LVA\s*(et|\+)\s*LVB/i.test(r.name) && !/enseignement technologique/i.test(r.name)) {
            const lva = Math.abs(r.hours - 5.5) < 0.01 ? 3 : Math.round(r.hours * 3 / 5.5 * 2) / 2;
            out.push({ name: 'LVA', hours: lva, raw: `${r.raw} pour LVA + LVB` });
            out.push({ name: 'LVB', hours: Math.round((r.hours - lva) * 100) / 100, raw: `${r.raw} pour LVA + LVB` });
        } else {
            out.push(r);
        }
    });
    // EMC en fin de chaque rubrique « Enseignements communs »
    const res = [];
    for (let i = 0; i < out.length; i++) {
        res.push(out[i]);
        const h = out[i];
        const isCommon = h.heading !== undefined && /communs/i.test(h.heading);
        if (isCommon) {
            let j = i + 1;
            while (j < out.length && out[j].heading === undefined) { res.push(out[j]); j++; }
            if (!out.slice(i + 1, j).some(x => /morale et civique/i.test(x.name))) {
                res.push({ name: 'Éducation morale et civique (EMC)', hours: 0.5, raw: '0h30' });
            }
            i = j - 1;
        }
    }
    return res;
}

function guessStructureAppLevel(hint) {
    const re = hint === 'T' ? /^t/i : (hint === '1' ? /^(1|premi)/i : new RegExp('^' + hint, 'i'));
    return levels.find(l => re.test(String(l).trim())) || levels[0] || '';
}

function openStructureModal() {
    if (!currentStructureType) currentStructureType = null;
    document.getElementById('structureModal').classList.add('active');
    renderStructureModal();
}

function closeStructureModal() {
    document.getElementById('structureModal').classList.remove('active');
}

function setStructureType(type) {
    currentStructureType = type;
    currentStructureLevelId = null;
    renderStructureModal();
}

function setStructureLevel(id) {
    currentStructureLevelId = id;
    renderStructureModal();
}

function structureStateKey(i) {
    return `${currentStructureType}|${currentStructureLevelId}|${i}`;
}

function getStructureRowState(i, defaultHours) {
    const k = structureStateKey(i);
    if (!structureRowState[k]) structureRowState[k] = { classes: 1, disc: '', hours: defaultHours, created: 0 };
    return structureRowState[k];
}

function updateStructureRow(i, field, value) {
    const st = structureRowState[structureStateKey(i)];
    if (!st) return;
    if (field === 'disc') st.disc = value;
    else st[field] = parseFloat(value);
}

function updateStructureLevelChoice(value) {
    structureLevelChoice[`${currentStructureType}|${currentStructureLevelId}`] = value;
}

function escapeStructureHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderStructureModal() {
    const container = document.getElementById('structureContent');
    const types = [['clg', 'Collège (CLG)'], ['lgt', 'Lycée (LGT)'], ['lp', 'Lycée Professionnel (LP)']];
    let html = `<p class="structure-intro">Choisissez le type d'EPLE, puis créez les services d'un niveau en les rattachant à une discipline.</p>
        <div class="mode-selector">${types.map(([k, l]) => `<button class="mode-btn ${k === currentStructureType ? 'active' : ''}" onclick="setStructureType('${k}')">${l}</button>`).join('')}</div>`;

    if (!currentStructureType) {
        container.innerHTML = html + '<p class="empty-state">Sélectionnez un type d\'EPLE pour afficher ses horaires réglementaires.</p>';
        return;
    }

    const lvls = getStructureLevels(currentStructureType);
    if (!currentStructureLevelId || !lvls.some(l => l.id === currentStructureLevelId)) currentStructureLevelId = lvls[0].id;
    const lvl = lvls.find(l => l.id === currentStructureLevelId);
    const disciplines = Object.keys(dataStore);

    html += `<div class="mode-selector">${lvls.map(l => `<button class="mode-btn ${l.id === currentStructureLevelId ? 'active' : ''}" onclick="setStructureLevel('${l.id}')">${l.label}</button>`).join('')}</div>`;

    if (disciplines.length === 0) {
        container.innerHTML = html + '<p class="empty-state">Aucune discipline n\'est définie. Ajoutez-en dans Paramètres > Disciplines.</p>';
        return;
    }
    if (levels.length === 0) {
        container.innerHTML = html + '<p class="empty-state">Aucun niveau n\'est défini dans Paramètres.</p>';
        return;
    }

    const choiceKey = `${currentStructureType}|${currentStructureLevelId}`;
    if (!structureLevelChoice[choiceKey] || !levels.includes(structureLevelChoice[choiceKey])) {
        structureLevelChoice[choiceKey] = guessStructureAppLevel(lvl.hint);
    }
    const levelOptions = levels.map(l => `<option value="${escapeStructureHtml(l)}" ${l === structureLevelChoice[choiceKey] ? 'selected' : ''}>${escapeStructureHtml(l)}</option>`).join('');
    html += `<div class="structure-level-pick"><label>Niveau de l'application pour ces services :
        <select onchange="updateStructureLevelChoice(this.value)">${levelOptions}</select></label></div>`;
    if (lvl.annual) {
        html += `<p class="structure-note">Les grilles de la voie professionnelle sont annuelles : l'horaire hebdomadaire proposé est l'horaire annuel ÷ ${STRUCTURE_LP_WEEKS} semaines. Il reste modifiable.</p>`;
    }

    let body = '';
    lvl.rows.forEach((r, i) => {
        if (r.heading !== undefined) {
            body += `<tr class="structure-heading-row level-${r.level}"><td colspan="5">${escapeStructureHtml(r.heading)}</td></tr>`;
            return;
        }
        const st = getStructureRowState(i, r.hours);
        const discOptions = `<option value="">— Choisir —</option>` + disciplines.map(d => `<option value="${escapeStructureHtml(d)}" ${d === st.disc ? 'selected' : ''}>${escapeStructureHtml(d)}</option>`).join('');
        body += `<tr>
            <td>${escapeStructureHtml(r.name)}</td>
            <td><input type="number" min="0" step="0.5" value="${st.hours}" title="Horaire réglementaire : ${escapeStructureHtml(r.raw)}" onchange="updateStructureRow(${i}, 'hours', this.value)"></td>
            <td><input type="number" min="1" step="1" value="${st.classes}" onchange="updateStructureRow(${i}, 'classes', this.value)"></td>
            <td><select onchange="updateStructureRow(${i}, 'disc', this.value)">${discOptions}</select></td>
            <td><button class="btn-secondary" onclick="createServiceFromStructure(${i})">➕ Créer</button>${st.created ? `<span class="structure-created">✓ ${st.created > 1 ? '×' + st.created : 'créé'}</span>` : ''}</td>
        </tr>`;
    });
    html += `<div class="table-container"><table class="structure-table"><thead><tr>
        <th>Enseignement</th><th>Horaire hebdo. (h)</th><th>Nb classes / groupes</th><th>Discipline</th><th>Service</th></tr></thead>
        <tbody>${body}</tbody></table></div>`;
    container.innerHTML = html;
}

function createServiceFromStructure(i) {
    const lvls = getStructureLevels(currentStructureType);
    const lvl = lvls.find(l => l.id === currentStructureLevelId);
    const r = lvl && lvl.rows[i];
    const st = structureRowState[structureStateKey(i)];
    if (!r || !st) return;
    if (!st.disc || !dataStore[st.disc]) { alert('Veuillez choisir une discipline pour ce service.'); return; }
    const classes = parseInt(st.classes, 10);
    const hours = parseFloat(st.hours);
    if (!(classes >= 1)) { alert('Le nombre de classes / groupes doit être au moins 1.'); return; }
    if (!(hours >= 0)) { alert("L'horaire hebdomadaire n'est pas valide."); return; }
    const level = structureLevelChoice[`${currentStructureType}|${currentStructureLevelId}`];

    dataStore[st.disc].services.push({
        level,
        levels: [level],
        name: r.name,
        classes,
        hours,
        ponderationActive: false,
        ponderationFactor: 1.1,
        isSpecialite: false,
        isOptionnel: false,
        isCoEnseignement: false,
        isMultiNiveau: false,
        locked: false,
        allocations: {}
    });
    baseHoursStore[getBaseHourKey(level, r.name)] = hours;
    st.created = (st.created || 0) + 1;
    renderApp();
    renderStructureModal();
}

// Pondération « brute » affichée sous les heures de chaque case service / enseignant :
// heures × (coefficient − 1), sans plafond ni formule. Les contraintes (plafond 1,1, formule 1,25)
// ne s'appliquent que dans la ligne « Pondérations » du pied de tableau.
function refreshCellPonds(table, data, disc) {
    table.querySelectorAll('.cell-pond').forEach(el => {
        const t = el.dataset.teacher;
        const anchor = dataStore[el.dataset.anchor];
        const sv = anchor && anchor.services[parseInt(el.dataset.sidx, 10)];
        const v = sv ? (parseFloat(sv.allocations && sv.allocations[t]) || 0) : 0;
        if (!sv || !sv.ponderationActive || !(v > 0)) { el.textContent = ''; return; }
        const f = sv.ponderationFactor || 1.1;
        el.textContent = `pond. ${fmtHours(v * (f - 1), data, false, 2)}`;
    });
}

// ============================================================
// Export : choix + PDF des services par enseignant
// ============================================================
function openExportChoiceModal() { document.getElementById('exportChoiceModal').classList.add('active'); }
function closeExportChoiceModal() { document.getElementById('exportChoiceModal').classList.remove('active'); }

function openTeacherExportModal() {
    const disciplines = Object.keys(dataStore);
    document.querySelectorAll('.tpdf-opt').forEach(cb => {
        if (cb.value === 'pondService' || cb.value === 'pondTotal') cb.closest('label').style.display = pondEnabled() ? '' : 'none';
        if (cb.value === 'total') cb.parentElement.lastChild.textContent = pondEnabled() ? ' Total (heures + pondérations + ARE)' : ' Total (heures + ARE)';
    });
    document.getElementById('teacherPdfDisciplinesList').innerHTML = disciplines.length === 0
        ? '<div class="empty-state" style="padding: 12px; font-size: 0.85rem;">Aucune discipline configurée.</div>'
        : disciplines.map(d => `<label class="export-checkbox-item"><input type="checkbox" class="tpdf-disc" value="${d.replace(/"/g, '&quot;')}" checked> ${escapeStructureHtml(d)}</label>`).join('');
    document.getElementById('teacherExportModal').classList.add('active');
}
function closeTeacherExportModal() { document.getElementById('teacherExportModal').classList.remove('active'); }
function setAllTeacherPdfDisciplines(checked) {
    document.querySelectorAll('.tpdf-disc').forEach(cb => { cb.checked = checked; });
}

// Calcule les services et totaux d'un enseignant dans une discipline
function computeTeacherSummary(disc, t) {
    const data = dataStore[disc];
    const services = data.services.concat(getCrossListedOptions(disc).map(r => r.service));
    const sums = {}; sums[t] = 0;
    let raw = 0, otherPond = 0;
    const rows = [];
    services.forEach(sv => {
        const v = parseFloat(sv.allocations && sv.allocations[t]) || 0;
        if (!(v > 0)) return;
        raw += v;
        const f = sv.ponderationActive ? (sv.ponderationFactor || 1.1) : 1;
        let pond = 0;
        if (sv.ponderationActive) {
            pond = v * (f - 1);
            if (Math.abs(f - 1.25) < 0.01) sums['125:' + t] = (sums['125:' + t] || 0) + v;
            else if (Math.abs(f - 1.1) < 0.01) sums[t] += v * 0.1;
            else { sums['x:' + t] = sums['x:' + t] || {}; sums['x:' + t][f] = (sums['x:' + t][f] || 0) + v; }
        }
        const levelLabel = sv.isOptionnel
            ? (Array.isArray(sv.levels) ? sv.levels.join(', ') : (sv.level || ''))
            : (sv.level || '');
        rows.push({ level: levelLabel, levels: getServiceLevels(sv), name: sv.name || '', hours: v, active: !!sv.ponderationActive, factor: f, pond });
    });
    sums['raw:' + t] = raw;
    const pond = pondExtra(sums, t, data);
    const apport = data.apports && data.apports[t] !== undefined ? data.apports[t] : 18;
    const ares = getTeacherAres(data, t).map(a => ({ short: a.short, label: a.label || a.short, hours: parseFloat(a.hours) || 0 }));
    const are = ares.reduce((x, a) => x + a.hours, 0);
    const total = raw + pond + are;
    return { rows, raw, pond, are, ares, total, apport, hsa: total - apport, data };
}

function generateTeacherServicesPdf() {
    const opt = {};
    document.querySelectorAll('.tpdf-opt').forEach(cb => { opt[cb.value] = cb.checked; });
    if (!pondEnabled()) { opt.pondService = false; opt.pondTotal = false; }
    const discs = Array.from(document.querySelectorAll('.tpdf-disc')).filter(cb => cb.checked).map(cb => cb.value);
    if (discs.length === 0) { alert('Veuillez sélectionner au moins une discipline.'); return; }

    const esc = escapeStructureHtml;
    const eple = epleIdentity && epleIdentity.name ? esc(epleIdentity.name) : '';
    const dateStr = new Date().toLocaleDateString('fr-FR');
    const fmtF = f => String(f).replace('.', ',');
    const pages = [];

    discs.forEach(disc => {
        const data = dataStore[disc];
        if (!data) return;
        data.teachers.forEach(t => {
            const sum = computeTeacherSummary(disc, t);
            const fh = (v, signed) => fmtHours(v, data, signed, 2);

            const infos = [];
            if (opt.discipline) infos.push(`<div><span>Discipline</span><strong>${esc(disc)}</strong></div>`);
            if (opt.apport) infos.push(`<div><span>ORS</span><strong>${fh(sum.apport)}</strong></div>`);

            const showService = opt.niveau || opt.heures || opt.pondService;
            let table = '';
            if (showService) {
                const head = `<tr>${opt.niveau ? '<th>Niveau</th>' : ''}<th>Intitulé Service / Matière</th>${opt.heures ? '<th class="num">Heures</th>' : ''}${opt.pondService ? '<th class="num">Pondération</th>' : ''}</tr>`;
                const body = sum.rows.length === 0
                    ? `<tr><td colspan="4" class="empty">Aucun service attribué</td></tr>`
                    : sum.rows.map(r => `<tr>${opt.niveau ? `<td>${esc(r.level)}</td>` : ''}<td>${esc(r.name)}</td>${opt.heures ? `<td class="num">${fh(r.hours)}</td>` : ''}${opt.pondService ? `<td class="num">${r.active ? `${fh(r.pond)} <small>(× ${fmtF(r.factor)})</small>` : '—'}</td>` : ''}</tr>`).join('');
                table = `<table class="tpdf-table"><thead>${head}</thead><tbody>${body}</tbody></table>`;
            }

            const totals = [];
            if (opt.totalHeures) totals.push(['Total des heures enseignées', fh(sum.raw)]);
            if (opt.pondTotal) totals.push(['Pondérations', fh(sum.pond)]);
            if (opt.are) sum.ares.forEach(a => totals.push([`ARE : ${esc(a.label)} (${esc(a.short)})`, fh(a.hours)]));
            if (opt.total) totals.push([pondEnabled() ? 'Total (heures + pondérations + ARE)' : 'Total (heures + ARE)', fh(sum.total)]);
            if (opt.hsa) totals.push(['HSA (Total − ORS)', fh(sum.hsa, true)]);
            const totalsHtml = totals.length
                ? `<table class="tpdf-totals">${totals.map(([l, v]) => `<tr><td>${l}</td><td class="num"><strong>${v}</strong></td></tr>`).join('')}</table>`
                : '';

            pages.push(`<section class="tpdf-page">
                <div class="tpdf-meta">${eple}${eple ? ' · ' : ''}Édité le ${dateStr}</div>
                <h1>${esc(t)}</h1>
                ${infos.length ? `<div class="tpdf-infos">${infos.join('')}</div>` : ''}
                ${table}
                ${totalsHtml}
            </section>`);
        });
    });

    if (pages.length === 0) { alert('Aucun enseignant dans les disciplines sélectionnées.'); return; }

    const container = document.getElementById('teacherPdfPrint');
    container.innerHTML = pages.join('');
    closeTeacherExportModal();
    document.body.classList.add('printing-teachers');
    const cleanup = () => {
        document.body.classList.remove('printing-teachers');
        container.innerHTML = '';
        window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    triggerPrint();
}

// ============================================================
// Barre de menus (Fichier, Édition, Autonomie, Structure, Paramètres)
// ============================================================
function closeAllMenus() {
    document.querySelectorAll('.menu.open').forEach(m => m.classList.remove('open'));
    document.querySelectorAll('.menu-group.open, .menu-group-toggle.open').forEach(el => el.classList.remove('open'));
}

function toggleMenu(event, btn) {
    event.stopPropagation();
    const menu = btn.closest('.menu');
    const wasOpen = menu.classList.contains('open');
    closeAllMenus();
    if (!wasOpen) menu.classList.add('open');
}

function toggleMenuGroup(event, btn) {
    event.stopPropagation();
    const group = btn.nextElementSibling;
    const willOpen = !btn.classList.contains('open');
    // un seul sous-menu ouvert à la fois dans un même menu
    const panel = btn.closest('.menu-panel');
    if (panel) panel.querySelectorAll('.menu-group-toggle.open, .menu-group.open').forEach(el => el.classList.remove('open'));
    if (willOpen) { btn.classList.add('open'); if (group) group.classList.add('open'); }
}

document.addEventListener('click', () => setTimeout(closeAllMenus, 0));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllMenus(); });
// Survol : si un menu est ouvert, passer à un autre menu en le survolant
document.addEventListener('mouseover', e => {
    const menu = e.target.closest && e.target.closest('.menu');
    if (!menu || menu.classList.contains('open')) return;
    if (document.querySelector('.menu.open')) {
        closeAllMenus();
        menu.classList.add('open');
    }
});

// Affiche le rappel du nom des enseignants sous le tableau lorsque l'en-tête (noms) est sorti de l'écran par le haut
function updateTeacherNameReminders() {
    document.querySelectorAll('.tab-content.active table').forEach(table => {
        const th = table.querySelector('thead th.draggable-teacher');
        if (!th) { table.classList.remove('header-out'); return; }
        const headerGone = th.getBoundingClientRect().bottom <= 0;
        const rect = table.getBoundingClientRect();
        table.classList.toggle('header-out', headerGone && rect.bottom > 0);
    });
}
window.addEventListener('scroll', updateTeacherNameReminders, { passive: true });
window.addEventListener('resize', updateTeacherNameReminders);

// Récapitulatif de la discipline (mêmes valeurs que dans le TRMD)
function getDisciplineTotals(disc) {
    const data = dataStore[disc];
    const totals = { raw: 0, hsa: 0, grand: 0, pond: 0, are: 0 };
    if (!data) return totals;
    data.teachers.forEach(t => {
        const sm = computeTeacherSummary(disc, t);
        totals.raw += sm.raw;
        totals.hsa += sm.hsa;
        totals.grand += sm.total;
        totals.pond += sm.pond;
        totals.are += sm.are;
    });
    return totals;
}

function buildDisciplineSummaryHtml(disc) {
    const data = dataStore[disc];
    const t = getDisciplineTotals(disc);
    const hsaClass = t.hsa >= 0 ? 'success' : 'danger';
    return `
        <div class="disc-summary-item"><span>Volume ventilé</span><strong>${fmtHours(t.raw, data, false, 1)}</strong></div>
        <div class="disc-summary-item"><span>HSA</span><strong><span class="badge ${hsaClass}">${fmtHours(t.hsa, data, true, 2)}</span></strong></div>
        <div class="disc-summary-item" title="Total ${totalLabelSuffix()}"><span>Total</span><strong>${fmtHours(t.grand, data, false, 2)}</strong></div>`;
}

// ============================================================
// Export pour la présentation (PDF paysage avec numérotation n/X)
// ============================================================
const PRESENTATION_SECTIONS = [
    ['effectifs', 'Prévision d\'effectifs'],
    ['dotation', 'Rappel de la dotation'],
    ['trmd', 'TRMD'],
    ['disciplines', 'Ventilation par discipline'],
    ['niveaux', 'Autonomie par niveau'],
    ['autDisc', 'Autonomie par discipline'],
    ['focusSpe', 'Focus sur les spécialités'],
    ['focusOpt', 'Focus sur les options'],
    ['stats', 'Statistiques de la DHG (pages insérées après le TRMD)']
];

// Les rubriques « Focus » n'existent que si l'option correspondante est activée
function presSectionAvailable(k) {
    if (k === 'effectifs') return hasEnrollmentData();
    if (k === 'focusSpe') return !!epleIdentity.enableSpecialites;
    if (k === 'focusOpt') return !!epleIdentity.enableOptionnels;
    return true;
}

function openPresentationExportModal() {
    const escAttr = v => v.replace(/"/g, '&quot;');
    document.getElementById('presSectionsList').innerHTML = PRESENTATION_SECTIONS.filter(([k]) => presSectionAvailable(k)).map(([k, label]) =>
        `<label class="export-checkbox-item"><input type="checkbox" class="pres-sec" value="${k}" checked> ${label}</label>`).join('');
    document.getElementById('presDisciplinesList').innerHTML = Object.keys(dataStore).map(d =>
        `<label class="export-checkbox-item"><input type="checkbox" class="pres-disc" value="${escAttr(d)}" checked> ${escapeStructureHtml(d)}</label>`).join('')
        || '<div class="empty-state" style="padding: 12px; font-size: 0.85rem;">Aucune discipline configurée.</div>';
    document.getElementById('presLevelsList').innerHTML = levels.map(l =>
        `<label class="export-checkbox-item"><input type="checkbox" class="pres-lvl" value="${escAttr(l)}" checked> ${escapeStructureHtml(l)}</label>`).join('');
    document.getElementById('presentationExportModal').classList.add('active');
}
function closePresentationExportModal() { document.getElementById('presentationExportModal').classList.remove('active'); }
function setAllPresChecks(cls, checked) { document.querySelectorAll('.' + cls).forEach(cb => { cb.checked = checked; }); }

function startPresentationExport() {
    const sections = {};
    document.querySelectorAll('.pres-sec').forEach(cb => { sections[cb.value] = cb.checked; });
    if (!Object.values(sections).some(Boolean)) { alert('Veuillez sélectionner au moins une rubrique.'); return; }
    const opts = {
        sections,
        disciplines: Array.from(document.querySelectorAll('.pres-disc')).filter(cb => cb.checked).map(cb => cb.value),
        levels: Array.from(document.querySelectorAll('.pres-lvl')).filter(cb => cb.checked).map(cb => cb.value)
    };
    closePresentationExportModal();
    generatePresentationPdf(opts);
}

function generatePresentationPdf(opts) {
    const esc = escapeStructureHtml;
    const allDisciplines = Object.keys(dataStore);
    const allSections = {}; PRESENTATION_SECTIONS.forEach(([k]) => { allSections[k] = true; });
    opts = opts || { sections: allSections, disciplines: allDisciplines, levels: levels.slice() };
    const sel = Object.assign({}, opts.sections);
    PRESENTATION_SECTIONS.forEach(([k]) => { if (!presSectionAvailable(k)) sel[k] = false; });
    const disciplines = allDisciplines;                       // le TRMD porte toujours sur l'ensemble de l'EPLE
    const selDisciplines = allDisciplines.filter(d => opts.disciplines.includes(d));
    const selLevels = levels.filter(l => opts.levels.includes(l));
    if (disciplines.length === 0) { alert('Aucune discipline à exporter.'); return; }

    const now = new Date();
    const dateStr = now.toLocaleDateString('fr-FR');
    const epleName = epleIdentity && epleIdentity.name ? epleIdentity.name : '';
    const epleSub = [epleIdentity && epleIdentity.commune, epleIdentity && epleIdentity.uai ? `UAI ${epleIdentity.uai}` : '']
        .filter(Boolean).join(' · ');
    const fmt1 = v => (v || 0).toFixed(1);

    // Hauteur utile d'une page (px) : 188 mm moins le pied de page et une marge de sécurité
    const PAGE_INNER_PX = Math.floor(188 * 96 / 25.4) - 52;

    const measureBox = document.createElement('div');
    measureBox.className = 'pres-measure';
    document.body.appendChild(measureBox);

    // Découpe un tableau en pages : renvoie une liste de listes de lignes HTML
    function paginateTable(headHtml, rows, titleReserve, tableClass) {
        measureBox.innerHTML = `<table class="pres-table${tableClass ? ' ' + tableClass : ''}"><thead>${headHtml}</thead><tbody>${rows.map(r => r.html).join('')}</tbody></table>`;
        const theadH = measureBox.querySelector('thead').offsetHeight;
        const trs = measureBox.querySelectorAll('tbody tr');
        const avail = PAGE_INNER_PX - titleReserve - theadH;
        const pages = [[]];
        let used = 0;
        rows.forEach((r, i) => {
            const rh = trs[i].offsetHeight;
            const cur = pages[pages.length - 1];
            if (cur.length > 0 && used + rh > avail) {
                // un titre de niveau ne reste pas seul en bas de page
                const last = cur[cur.length - 1];
                const carry = last && last.level ? [cur.pop()] : [];
                pages.push(carry);
                used = carry.reduce((s, x) => s + x.h, 0);
            }
            pages[pages.length - 1].push({ html: r.html, level: r.level, h: rh });
            used += rh;
        });
        return pages;
    }
    const TITLE_RESERVE = 70;

    const pages = []; // chaque page : fonction (n, total) => html
    const sectionStart = {}; // numéro de la première page de chaque rubrique du sommaire

    // 1. Couverture (absente des exports d'une seule rubrique)
    if (!opts.bare) pages.push(() => `
        <div class="pres-cover" style="height: 100%;">
            <div class="pres-eple">${esc(epleName || 'Établissement')}</div>
            ${epleSub ? `<div class="pres-eple-sub">${esc(epleSub)}</div>` : ''}
            <div class="pres-main-title">Ventilation de la DHG - Version du ${dateStr}</div>
        </div>`);

    // 2. Sommaire (le contenu est évalué à la fin, quand les numéros de page sont connus)
    const tocEntries = PRESENTATION_SECTIONS.filter(([k]) => sel[k] && k !== 'stats');
    // Page de titre qui introduit une rubrique
    const pushDivider = key => {
        if (opts.bare) return;
        const idx = tocEntries.findIndex(([k]) => k === key);
        const label = tocEntries[idx][1];
        pages.push(() => `
            <div class="pres-divider">
                <div class="pres-divider-num">${idx + 1}</div>
                <div class="pres-divider-title">${label}</div>
            </div>`);
    };
    if (tocEntries.length && !opts.bare) pages.push(() => `
        <h1 class="pres-title">Sommaire</h1>
        <div class="pres-toc">
            ${tocEntries.map(([k, label], i) => `<div class="pres-toc-row"><span class="pres-toc-label">${i + 1} - ${label}</span><span class="pres-toc-dots"></span><span class="pres-toc-page">${sectionStart[k] !== undefined ? sectionStart[k] : ''}</span></div>`).join('')}
        </div>`);

    // 2 bis. Prévision d'effectifs (annoncés par la DSDEN) : amont de la dotation
    if (sel.effectifs) {
        sectionStart.effectifs = pages.length + 1;
        pushDivider('effectifs');
        const en = computeEnrollmentRows();
        const T = en.total;
        const f1 = (n, d) => fmtEnr(n, d);
        const evoTxt = (cur, fc) => {
            if (cur === null || fc === null) return '—';
            const d = fc - cur, p = cur > 0 ? d / cur * 100 : null;
            return `${d > 0 ? '+' : ''}${f1(d, 0)}${p === null ? '' : ` (${d > 0 ? '+' : ''}${f1(p, 1)} %)`}`;
        };
        const eHead = `<tr><th style="width:15%">Niveau</th>${en.hasCur ? '<th class="num" style="white-space:normal">Effectif année en cours</th>' : ''}<th class="num" style="white-space:normal">Effectif prévu (DSDEN)</th>${en.hasCur ? '<th class="num" style="white-space:normal">Évolution</th>' : ''}<th class="num" style="white-space:normal">Divisions prévues</th><th class="num" style="white-space:normal">Élèves / division</th><th class="num" style="white-space:normal">Divisions ventilées</th><th class="num" style="white-space:normal">H/E</th></tr>`;
        const eRows = en.rows.map(r => ({ html: `<tr><td><strong>${esc(r.label)}</strong></td>${en.hasCur ? `<td class="num">${f1(r.cur, 0)}</td>` : ''}<td class="num"><strong>${f1(r.fc, 0)}</strong></td>${en.hasCur ? `<td class="num">${evoTxt(r.cur, r.fc)}</td>` : ''}<td class="num">${f1(r.dv, 0)}</td><td class="num">${r.fc !== null && r.dv ? f1(r.fc / r.dv, 1) : '—'}</td><td class="num">${f1(r.ventDiv, 0)}${r.dv !== null ? (Math.abs(r.dv - r.ventDiv) < 0.004 ? ' ✓' : ' ⚠') : ''}</td><td class="num">${r.fc ? f1(r.vol / r.fc, 2) + ' h' : '—'}</td></tr>` }));
        eRows.push({ html: `<tr class="pres-total"><td>Total</td>${en.hasCur ? `<td class="num">${f1(T.cur, 0)}</td>` : ''}<td class="num">${f1(T.fc, 0)}</td>${en.hasCur ? `<td class="num">${T.hasBoth ? evoTxt(T.bothCur, T.bothFc) : '—'}</td>` : ''}<td class="num">${f1(T.dv, 0)}</td><td class="num">${T.fc !== null && T.dv ? f1(T.fc / T.dv, 1) : '—'}</td><td class="num">${f1(T.ventDiv, 0)}</td><td class="num">${T.fc ? f1(T.vol / T.fc, 2) + ' h' : '—'}</td></tr>` });
        const eDgh = (parseFloat(dotationGlobal.hp) || 0) + (parseFloat(dotationGlobal.hsa) || 0);
        const eSub = [enrollmentForecast.rentree ? `Rentrée ${esc(enrollmentForecast.rentree)}` : '', enrollmentForecast.source ? esc(enrollmentForecast.source) : ''].filter(Boolean).join(' · ');
        const ePages = paginateTable(eHead, eRows, TITLE_RESERVE + 8);
        ePages.forEach((pg, i) => pages.push(() => `
            <h1 class="pres-title">Prévision d'effectifs${ePages.length > 1 ? ` <small>(suite ${i + 1}/${ePages.length})</small>` : ''}</h1>
            ${eSub ? `<p class="pres-note" style="margin-top:0">${eSub}</p>` : ''}
            <table class="pres-table pres-table-opt"><thead>${eHead}</thead><tbody>${pg.map(r => r.html).join('')}</tbody></table>
            ${i === ePages.length - 1 ? `${T.fc && eDgh > 0 ? `<p class="pres-note">DHG totale / effectif prévu : ${f1(eDgh / T.fc, 2)} h par élève (${f1(eDgh, 1)} h pour ${f1(T.fc, 0)} élèves).</p>` : ''}<p class="pres-note">H/E = volume horaire des services du niveau (classes × volume classe) / effectif prévu. ✓ : divisions de la ventilation conformes à la structure prévue ; ⚠ : écart à corriger.</p>` : ''}`));
    }

    // 3. Rappel de la dotation
    if (sel.dotation) {
    sectionStart.dotation = pages.length + 1;
    pushDivider('dotation');
    const hp = dotationGlobal.hp || 0, hsa = dotationGlobal.hsa || 0;
    pages.push(() => `
        <h1 class="pres-title">Rappel de la dotation</h1>
        <div class="pres-dotation">
            <div class="pres-dotation-item"><span>HP</span><strong>${fmt1(hp)} h</strong></div>
            <div class="pres-dotation-item"><span>HSA</span><strong>${fmt1(hsa)} h</strong></div>
            <div class="pres-dotation-item"><span>DHG</span><strong>${fmt1(hp + hsa)} h</strong></div>
        </div>`);

    }

    // 4. TRMD
    if (sel.trmd) {
    sectionStart.trmd = pages.length + 1;
    pushDivider('trmd');
    let gTeachers = 0, gHp = 0, gRaw = 0, gHsa = 0, gTotal = 0;
    const trmdRows = disciplines.map(disc => {
        const d = dataStore[disc];
        const t = getDisciplineTotals(disc);
        const dHp = getDisciplineHP(disc);
        gTeachers += d.teachers.length; gHp += dHp; gRaw += t.raw; gHsa += t.hsa; gTotal += t.grand;
        return { html: `<tr><td><strong>${esc(disc)}</strong></td><td class="num">${d.teachers.length}</td><td class="num">${fmt1(dHp)} h</td><td class="num">${fmt1(t.raw)} h</td><td class="num">${t.hsa > 0 ? '+' : ''}${t.hsa.toFixed(2)} h</td><td class="num"><strong>${t.grand.toFixed(2)} h</strong></td></tr>` };
    });
    trmdRows.push({ html: `<tr class="pres-total"><td>Total</td><td class="num">${gTeachers}</td><td class="num">${fmt1(gHp)} h</td><td class="num">${fmt1(gRaw)} h</td><td class="num">${gHsa > 0 ? '+' : ''}${gHsa.toFixed(2)} h</td><td class="num" style="white-space:nowrap">${gTotal.toFixed(2)} h - Norvégien : ${(() => { const nv = (dotationGlobal.hp || 0) + (dotationGlobal.hsa || 0) - gTotal; return (nv > 0 ? '+' : '') + nv.toFixed(2); })()} h</td></tr>` });
    const trmdHead = '<tr><th>Discipline</th><th class="num">Nb Ens.</th><th class="num">HP (ORS)</th><th class="num">Volume ventilé</th><th class="num">HSA</th><th class="num">Total (' + totalLabelSuffix() + ')</th></tr>';
    const trmdPages = paginateTable(trmdHead, trmdRows, TITLE_RESERVE);
    trmdPages.forEach((rows, i) => {
        pages.push(() => `
            <h1 class="pres-title">TRMD${trmdPages.length > 1 ? ` <small>(${i + 1}/${trmdPages.length})</small>` : ''}</h1>
            <table class="pres-table"><thead>${trmdHead}</thead><tbody>${rows.map(r => r.html).join('')}</tbody></table>`);
    });

    }

    // Statistiques de la DHG : pages insérées à la suite du TRMD (pas de chapitre à part)
    if (sel.stats) {
        const st = computeDhgStats();
        const p2 = st.dgh > 0;
        const bar = p => `<div class="pres-bar"><span style="width:${Math.max(0, Math.min(100, p || 0)).toFixed(1)}%"></span></div>`;
        const cols = statColumns(st);
        const headHtml = first => `<tr><th>${first}</th>${cols.map(c => `<th class="num">${c.label}</th>`).join('')}<th class="num">Part</th>${p2 ? '<th class="num">Part de la DHG</th>' : ''}<th style="width:20%">Répartition</th></tr>`;
        const rowHtml = r => `<tr><td>${esc(r.label)}</td>${cols.map(c => `<td class="num">${c.strong ? '<strong>' : ''}${statCell(r, c)}${c.strong ? '</strong>' : ''}</td>`).join('')}<td class="num"><strong>${r.pct === null ? '—' : fmtPct(r.pct)}</strong></td>${p2 ? `<td class="num">${r.pct2 === null ? '—' : fmtPct(r.pct2)}</td>` : ''}<td class="pres-bar-cell">${r.pct === null ? '' : bar(r.pct)}</td></tr>`;
        const totalHtml = `<tr class="pres-total"><td>Total</td>${cols.map(c => `<td class="num">${fmtStatH(c.k === 'raw' ? st.tRaw : c.k === 'weighted' ? st.tWeighted : c.k === 'are' ? st.tAre : st.grandTotal)}</td>`).join('')}<td class="num">100 %</td>${p2 ? `<td class="num">${fmtPct(st.grandTotal / st.dgh * 100)}</td>` : ''}<td></td></tr>`;
        const sub = t => `<h2 class="pres-subtitle">${t}</h2>`;
        const pieBlock = (title, rows) => `${sub(title)}<div class="pres-pie-row">${pieSvg(rows, 190)}<table class="pres-table pres-pie-table"><thead><tr><th></th><th>Poste</th><th class="num">Heures</th><th class="num">Part</th></tr></thead><tbody>${rows.map((r, i) => `<tr><td style="width:7mm"><span class="pie-dot" style="background:${PIE_COLORS[i % PIE_COLORS.length]}"></span></td><td>${esc(r.label)}</td><td class="num">${fmtStatH(r.h)}</td><td class="num"><strong>${r.pct === null ? '—' : fmtPct(r.pct)}</strong></td></tr>`).join('')}</tbody></table></div>`;
        const baseNote = `Base : heures attribuées aux enseignants${st.hasPond || st.hasAre ? ' (' + esc(totalLabelSuffix()) + ')' : ''} ; le total est identique à celui du TRMD.`;

        // Page 1 : dotation et utilisation, en diagrammes circulaires
        pages.push(() => `
            <h1 class="pres-title">Statistiques - Dotation</h1>
            ${pieBlock('Répartition de la dotation (DHG ' + fmtStatH(st.dgh) + ')', st.dotation)}
            ${pieBlock('Utilisation de la dotation', st.usage)}
            ${p2 ? '' : '<p class="pres-note">La dotation (HP / HSA) n\'est pas renseignée : les parts de la DHG ne sont pas calculables.</p>'}`);

        // Par discipline (paginé)
        const dHead = headHtml('Discipline');
        const dRows = st.byDisc.map(r => ({ html: rowHtml(r) }));
        dRows.push({ html: totalHtml });
        const dPages = paginateTable(dHead, dRows, TITLE_RESERVE);
        dPages.forEach((pg, i) => pages.push(() => `
            <h1 class="pres-title">Statistiques - Par discipline${dPages.length > 1 ? ` <small>(suite ${i + 1}/${dPages.length})</small>` : ''}</h1>
            <table class="pres-table"><thead>${dHead}</thead><tbody>${pg.map(r => r.html).join('')}</tbody></table>
            ${i === dPages.length - 1 ? `<p class="pres-note">${baseNote}</p>` : ''}`));

        // Par niveau (paginé)
        const lHead = headHtml('Niveau');
        const lRows = st.byLevel.map(r => ({ html: rowHtml(r) }));
        lRows.push({ html: totalHtml });
        const lPages = paginateTable(lHead, lRows, TITLE_RESERVE);
        lPages.forEach((pg, i) => pages.push(() => `
            <h1 class="pres-title">Statistiques - Par niveau${lPages.length > 1 ? ` <small>(suite ${i + 1}/${lPages.length})</small>` : ''}</h1>
            <table class="pres-table"><thead>${lHead}</thead><tbody>${pg.map(r => r.html).join('')}</tbody></table>
            ${i === lPages.length - 1 ? `<p class="pres-note">${baseNote} Les heures de chaque enseignant sont réparties selon le niveau de ses services (options multi-niveaux à parts égales) ; les ARE, qui ne dépendent d'aucun niveau, figurent sur une ligne à part.</p>` : ''}`));
    }

    // 5. Disciplines, niveaux regroupés
    if (sel.disciplines) {
    sectionStart.disciplines = pages.length + 1;
    pushDivider('disciplines');
    const discHead = '<tr><th>Intitulé du service</th><th class="num">Horaire plancher</th><th class="num">Nb classes / groupes</th><th class="num">Vol. classe</th><th class="num">À ventiler</th></tr>';
    selDisciplines.forEach(disc => {
        const d = dataStore[disc];
        const groups = {};
        d.services.forEach(sv => {
            const lv = getServiceLevels(sv);
            const key = lv.join(', ');
            if (!groups[key]) groups[key] = { levels: lv, services: [] };
            groups[key].services.push(sv);
        });
        const order = lv => { const i = levels.indexOf(lv[0]); return i === -1 ? 999 : i; };
        const rows = [];
        Object.values(groups).sort((a, b) => order(a.levels) - order(b.levels)).forEach(g => {
            rows.push({ level: true, html: `<tr class="pres-level"><td colspan="5">${esc(g.levels.join(', '))}</td></tr>` });
            g.services.forEach(sv => {
                const base = baseHoursStore[getBaseHourKey(g.levels[0], sv.name || '')];
                const baseVal = base !== undefined && base !== '' ? fmtHours(parseFloat(base) || 0, d, false, 1) : '—';
                const target = (sv.classes || 0) * (sv.hours || 0);
                rows.push({ html: `<tr><td>${esc(sv.name || '')}</td><td class="num">${baseVal}</td><td class="num">${sv.classes || 0}</td><td class="num">${fmtHours(sv.hours || 0, d, false, 1)}</td><td class="num"><strong>${fmtHours(target, d, false, 1)}</strong></td></tr>` });
            });
        });
        if (rows.length === 0) {
            pages.push(() => `<h1 class="pres-title">${esc(disc)}</h1><p>Aucun service dans cette discipline.</p>`);
            return;
        }
        const dPages = paginateTable(discHead, rows, TITLE_RESERVE);
        dPages.forEach((pg, i) => {
            pages.push(() => `
                <h1 class="pres-title">${esc(disc)}${dPages.length > 1 ? ` <small>(suite ${i + 1}/${dPages.length})</small>` : ''}</h1>
                <table class="pres-table"><thead>${discHead}</thead><tbody>${pg.map(r => r.html).join('')}</tbody></table>`);
        });
    });

    }

    // 6. Autonomie par niveau : synthèse puis une page par niveau
    if (sel.niveaux) {
    sectionStart.niveaux = pages.length + 1;
    pushDivider('niveaux');
    const levelData = selLevels.map(lvl => {
        const byTitle = {};
        Object.keys(dataStore).forEach(dn => {
            dataStore[dn].services.forEach(sv => {
                if (serviceMatchesLevel(sv, lvl) && sv.name && sv.name.trim() !== '') {
                    const name = sv.name.trim();
                    if (!byTitle[name]) byTitle[name] = { classes: 0, hours: 0, isCoEns: false };
                    byTitle[name].classes += (sv.classes || 0);
                    byTitle[name].hours = (sv.hours || 0);
                    if (sv.isCoEnseignement) byTitle[name].isCoEns = true;
                }
            });
        });
        const rows = [];
        let total = 0;
        Object.keys(byTitle).sort().forEach(name => {
            const sd = byTitle[name];
            const base = parseFloat(baseHoursStore[getBaseHourKey(lvl, name)]) || 0;
            const cell = computeAutonomieCell(sd.classes, sd.hours, base);
            total += cell.clamped;
            if (cell.clamped > 0) rows.push({ name, base, hours: sd.hours, classes: sd.isCoEns ? `${sd.classes / 2} (Co-E)` : `${sd.classes}`, autonomie: cell.clamped });
        });
        return { lvl, hasServices: Object.keys(byTitle).length > 0, rows, total };
    }).filter(l => l.hasServices);

    // 6a. Utilisation de la marge d'autonomie par niveau
    const margeHead = '<tr><th>Niveau</th><th class="num">Nombre de services avec autonomie</th><th class="num">Autonomie utilisée</th></tr>';
    const margeRows = levelData.map(l => ({ html: `<tr><td><strong>${esc(l.lvl)}</strong></td><td class="num">${l.rows.length}</td><td class="num"><strong>${l.total > 0 ? '+' : ''}${l.total.toFixed(1)} h</strong></td></tr>` }));
    const margeTotal = levelData.reduce((a, l) => a + l.total, 0);
    margeRows.push({ html: `<tr class="pres-total"><td>TOTAL EPLE</td><td class="num">${levelData.reduce((a, l) => a + l.rows.length, 0)}</td><td class="num">${margeTotal > 0 ? '+' : ''}${margeTotal.toFixed(1)} h</td></tr>` });
    if (levelData.length === 0) {
        pages.push(() => `<h1 class="pres-title">Utilisation de la marge d'autonomie par niveau</h1><p>Aucun service défini.</p>`);
    } else {
        const mPages = paginateTable(margeHead, margeRows, TITLE_RESERVE);
        mPages.forEach((pg, i) => {
            pages.push(() => `
                <h1 class="pres-title">Utilisation de la marge d'autonomie par niveau${mPages.length > 1 ? ` <small>(suite ${i + 1}/${mPages.length})</small>` : ''}</h1>
                <table class="pres-table"><thead>${margeHead}</thead><tbody>${pg.map(r => r.html).join('')}</tbody></table>`);
        });
    }

    // 6b. Une page par niveau
    const lvlHead = '<tr><th>Intitulé du service</th><th class="num">Horaire plancher</th><th class="num">Volume classe</th><th class="num">Nombre de classes</th><th class="num">Autonomie</th></tr>';
    levelData.forEach(l => {
        const rows = l.rows.map(r => ({ html: `<tr><td>${esc(r.name)}</td><td class="num">${r.base.toFixed(1)} h</td><td class="num">${r.hours.toFixed(1)} h</td><td class="num">${esc(r.classes)}</td><td class="num"><strong>+${r.autonomie.toFixed(1)} h</strong></td></tr>` }));
        if (rows.length === 0) rows.push({ html: '<tr><td colspan="5" class="num" style="font-style: italic;">Aucun service avec une autonomie supérieure à 0</td></tr>' });
        rows.push({ html: `<tr class="pres-total"><td colspan="4" style="text-align: right;">Total Autonomie pour ${esc(l.lvl)}</td><td class="num">${l.total > 0 ? '+' : ''}${l.total.toFixed(1)} h</td></tr>` });
        const lPages = paginateTable(lvlHead, rows, TITLE_RESERVE);
        lPages.forEach((pg, i) => {
            pages.push(() => `
                <h1 class="pres-title">Autonomie - ${esc(l.lvl)}${lPages.length > 1 ? ` <small>(suite ${i + 1}/${lPages.length})</small>` : ''}</h1>
                <table class="pres-table"><thead>${lvlHead}</thead><tbody>${pg.map(r => r.html).join('')}</tbody></table>`);
        });
    });

    }

    // 7. Autonomie par discipline
    if (sel.autDisc) {
        sectionStart.autDisc = pages.length + 1;
        pushDivider('autDisc');
        const adHead = '<tr><th>Intitulé du service</th><th class="num">Horaire plancher</th><th class="num">Volume classe</th><th class="num">Nombre de classes</th><th class="num">Autonomie</th></tr>';
        selDisciplines.forEach(disc => {
            const d = dataStore[disc];
            const items = [];
            let total = 0;
            const names = {};
            d.services.forEach(sv => { if (sv.name && sv.name.trim() !== '') { (names[sv.name.trim()] = names[sv.name.trim()] || []).push(sv); } });
            Object.keys(names).sort().forEach(name => {
                names[name].forEach(sv => {
                    getServiceLevels(sv).forEach(lvl => {
                        const base = parseFloat(baseHoursStore[getBaseHourKey(lvl, name)]) || 0;
                        const cell = computeAutonomieCell(sv.classes || 0, sv.hours || 0, base);
                        total += cell.clamped;
                        if (cell.clamped > 0) items.push({ label: `${name} (${lvl})`, base, hours: sv.hours || 0, classes: sv.isCoEnseignement ? `${sv.classes || 0} (Co-E)` : `${sv.classes || 0}`, autonomie: cell.clamped });
                    });
                });
            });
            const rows = items.map(r => ({ html: `<tr><td>${esc(r.label)}</td><td class="num">${r.base.toFixed(1)} h</td><td class="num">${r.hours.toFixed(1)} h</td><td class="num">${esc(r.classes)}</td><td class="num"><strong>+${r.autonomie.toFixed(1)} h</strong></td></tr>` }));
            if (rows.length === 0) rows.push({ html: '<tr><td colspan="5" class="num" style="font-style: italic;">Aucun service avec une autonomie supérieure à 0</td></tr>' });
            rows.push({ html: `<tr class="pres-total"><td colspan="4" style="text-align: right;">Total Autonomie pour ${esc(disc)}</td><td class="num">${total > 0 ? '+' : ''}${total.toFixed(1)} h</td></tr>` });
            const dPages = paginateTable(adHead, rows, TITLE_RESERVE);
            dPages.forEach((pg, i) => {
                pages.push(() => `
                    <h1 class="pres-title">Autonomie - ${esc(disc)}${dPages.length > 1 ? ` <small>(suite ${i + 1}/${dPages.length})</small>` : ''}</h1>
                    <table class="pres-table"><thead>${adHead}</thead><tbody>${pg.map(r => r.html).join('')}</tbody></table>`);
            });
        });
    }

    // 8. Focus sur les spécialités : un tableau par niveau (heures réellement attribuées par discipline)
    if (sel.focusSpe) {
    sectionStart.focusSpe = pages.length + 1;
    pushDivider('focusSpe');
    const fmtG = n => String(Math.round(n * 100) / 100).replace('.', ',');
    const speHead = '<tr><th style="width:30%">Matière</th><th class="num" style="width:15%">Nombre de groupes</th><th>Disciplines concernées (heures attribuées)</th><th class="num" style="width:13%">Total</th></tr>';
    let anySpe = false;
    levels.forEach(lvl => {
        const speRows = getSpecialiteRows(lvl);
        if (speRows.length === 0) return;
        anySpe = true;
        let totalGroups = 0, totalHours = 0;
        const rows = speRows.map(r => {
            totalGroups += r.groups;
            const byDisc = {};
            r.teachers.forEach(x => { byDisc[x.disc] = (byDisc[x.disc] || 0) + x.h; });
            const rowHours = Object.values(byDisc).reduce((x, y) => x + y, 0);
            totalHours += rowHours;
            const discTxt = r.discs.map(d => `${esc(d)} (${fmtG(byDisc[d] || 0)} h)`).join(', ');
            return { html: `<tr><td><strong>${esc(r.name)}</strong></td><td class="num">${fmtG(r.groups)}</td><td>${discTxt}</td><td class="num">${fmtG(rowHours)} h</td></tr>` };
        });
        rows.push({ html: `<tr class="pres-total"><td>Total</td><td class="num">${fmtG(totalGroups)}</td><td></td><td class="num">${fmtG(totalHours)} h</td></tr>` });
        const sPages = paginateTable(speHead, rows, TITLE_RESERVE);
        sPages.forEach((pg, i) => {
            pages.push(() => `
                <h1 class="pres-title">Spécialités - ${esc(lvl)}${sPages.length > 1 ? ` <small>(suite ${i + 1}/${sPages.length})</small>` : ''}</h1>
                <table class="pres-table"><thead>${speHead}</thead><tbody>${pg.map(r => r.html).join('')}</tbody></table>`);
        });
    });
    if (!anySpe) pages.push(() => '<h1 class="pres-title">Focus sur les spécialités</h1><p>Aucune spécialité cochée pour le moment.</p>');
    }

    // 9. Focus sur les options : tableau de la gestion des enseignements optionnels
    if (sel.focusOpt) {
    sectionStart.focusOpt = pages.length + 1;
    pushDivider('focusOpt');
    const fmtN = n => String(Math.round(n * 100) / 100).replace('.', ',');
    const optHead = '<tr><th style="width:16%">Niveau</th><th style="width:22%">Matière</th><th style="width:20%">Discipline rattachée</th><th class="num" style="width:11%">Nbr. groupes</th><th class="num" style="width:11%">Vol. horaire</th><th class="num" style="width:9%">Total</th><th class="num" style="width:11%">Vol. financé</th></tr>';
    const optItems = [];
    Object.keys(dataStore).forEach(disc => {
        dataStore[disc].services.forEach(sv => {
            if (!sv.isOptionnel) return;
            const lv = getServiceLevels(sv);
            const ds = (sv.assignedDisciplines && sv.assignedDisciplines.length) ? sv.assignedDisciplines : [disc];
            const vol = (sv.classes || 0) * (sv.hours || 0);
            const fin = sv.optFinancedHours !== undefined ? (parseFloat(sv.optFinancedHours) || 0) : 0;
            optItems.push({ levels: lv, name: sv.name || '', discs: ds, classes: sv.classes || 0, hours: sv.hours || 0, vol, fin });
        });
    });
    const lvlIdx = lv => { const i = levels.indexOf(lv[0]); return i === -1 ? 999 : i; };
    optItems.sort((x, y) => lvlIdx(x.levels) - lvlIdx(y.levels) || x.name.localeCompare(y.name, 'fr'));
    let optVol = 0, optFin = 0;
    const optRows = optItems.map(r => {
        optVol += r.vol; optFin += r.fin;
        return { html: `<tr><td>${esc(r.levels.join(', '))}</td><td><strong>${esc(r.name)}</strong></td><td>${esc(r.discs.join(', '))}</td><td class="num">${fmtN(r.classes)}</td><td class="num">${fmtN(r.hours)} h</td><td class="num">${fmtN(r.vol)} h</td><td class="num">${fmtN(r.fin)} h</td></tr>` };
    });
    if (optRows.length === 0) {
        pages.push(() => '<h1 class="pres-title">Focus sur les options</h1><p>Aucun enseignement optionnel pour le moment.</p>');
    } else {
        const marge = optVol - optFin;
        optRows.push({ html: `<tr class="pres-total"><td colspan="5" style="text-align: right;">Total des heures / total financé</td><td class="num">${fmtN(optVol)} h</td><td class="num">${fmtN(optFin)} h</td></tr>` });
        optRows.push({ html: `<tr class="pres-total"><td colspan="5" style="text-align: right;">Marge utilisée</td><td class="num" colspan="2">${marge > 0 ? '+' : ''}${fmtN(marge)} h</td></tr>` });
        const oPages = paginateTable(optHead, optRows, TITLE_RESERVE, 'pres-table-opt');
        oPages.forEach((pg, i) => {
            pages.push(() => `
                <h1 class="pres-title">Focus sur les options${oPages.length > 1 ? ` <small>(suite ${i + 1}/${oPages.length})</small>` : ''}</h1>
                <table class="pres-table pres-table-opt"><thead>${optHead}</thead><tbody>${pg.map(r => r.html).join('')}</tbody></table>`);
        });
    }
    }

    document.body.removeChild(measureBox);

    const total = pages.length;
    const footerLabel = `${esc(epleName)}${epleName ? ' · ' : ''}Ventilation de la DHG - ${dateStr}`;
    const container = document.getElementById('presentationPrint');
    container.innerHTML = pages.map((fn, i) => `
        <section class="pres-page">
            ${fn()}
            <div class="pres-footer"><span>${footerLabel}</span><span>${i + 1}/${total}</span></div>
        </section>`).join('');

    document.body.classList.add('printing-presentation');
    const cleanup = () => {
        document.body.classList.remove('printing-presentation');
        container.innerHTML = '';
        window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    triggerPrint();
}

// Heures postes (HP) d'une discipline : somme des ORS de ses enseignants
function getDisciplineHP(disc) {
    const data = dataStore[disc];
    if (!data) return 0;
    return data.teachers.reduce((sum, t) => sum + (data.apports && data.apports[t] !== undefined ? data.apports[t] : 18), 0);
}

// Nouveau : repart d'une base totalement vide (aucune discipline, aucun enseignant, aucun service)
function newEmptyProject() {
    if (!confirm("Créer un nouveau projet vide ? Toutes les données actuelles (disciplines, enseignants, services, historique…) seront effacées. Pensez à sauvegarder votre travail avant de continuer.")) {
        return;
    }
    Object.keys(structureRowState).forEach(k => delete structureRowState[k]);
    Object.keys(structureLevelChoice).forEach(k => delete structureLevelChoice[k]);
    setCurrentFile(null);
    applyLoadedData({
        dataStore: {},
        dotation: { hp: 0, hsa: 0 },
        levels: ["6ème", "5ème", "4ème", "3ème", "2nde", "1ère", "Terminale"],
        baseHoursStore: {},
        coEnseignementGroups: [],
        coordinators: [],
        n1Reference: null,
        enrollment: null,
        changeHistory: [],
        epleIdentity: { name: "", uai: "", commune: "", enableSpecialites: false, enableOptionnels: false, enableCoEnseignement: false, enableMultiNiveau: false, enableMultiSite: false, sites: [], enablePonderations: false }
    });
}

// ============================================================
// ARE (allègements / missions) : heures ajoutées au total de l'enseignant
// ============================================================
const ARE_CATALOG = [
    ['2 ETB.CD', 'EXERCICE DANS 2 ETAB DE 2 COMMUNES'],
    ['3 ETB.', 'EXERCICE DANS 3 ETABLISSEMENTS'],
    ['8H SPH', '8H OU PLUS EN SCIENCES PHYSIQUES'],
    ['8H SVT', '8H OU PLUS EN SVT ART 9 D.2014'],
    ['A.ELE.SH', 'ME PEDAGO/EDU : AIDE ÉLÈVES SH'],
    ['AC.ELE.DIF', 'ME PEDAGO/EDU : ACC ÉLÈVES EN DIFFICULTÉ'],
    ['AC.ELE.MIG', 'ME PEDAGO/EDU : ACC ÉLÈVES MIGRANTS'],
    ['ART/CULT', 'ME PEDAGO/EDU : ACTIVITÉS CULTURE OU ART'],
    ['ASSO.EPS', 'HEURES ASSOCIATIONS SPORTIVES'],
    ['AUTRE MISS', 'ME PEDAGO/EDU : AUTRES MISSIONS'],
    ['AUTRES.EP', 'AUTRES MISSIONS ÉDUCATION PRIORITAIRE'],
    ['CO.TECHNO', 'COORDINATION DISCIPLINE TECHNOLOGIE'],
    ['COOR.APSA', 'COORDINATION ACTIVITÉS PHYS SPORT ARTS'],
    ['COOR.CYENS', "COORDINATION DE CYCLE D'ENSEIGNEMENT"],
    ['COOR.DISC', 'COORDINATION DE DISCIPLINE(S)'],
    ['COOR.NIVEN', "COORDINATION DE NIVEAU D'ENSEIGNEMENT"],
    ['COOR.REP', 'COORDINATION RÉSEAU ÉDUCATION PRIORITAIRE'],
    ['MANIF/CHOR', 'ME PEDAGO/EDU : ORG MANIF CHORALE'],
    ['PART', 'ME PEDAGO/EDU : AUTRES PARTENARIATS'],
    ['PART.ENT', 'ME PEDAGO/EDU : PARTENARIATS ENTREPRISES'],
    ['REF.CULT', 'RÉFÉRENT CULTURE'],
    ['REF.DS', 'RÉFÉRENT DÉCROCHAGE SCOLAIRE'],
    ['REF.NUM', 'RÉFÉRENT RESSOURCES PÉDAGO NUMÉRIQUES'],
    ['TUT.LYCEE', 'TUTORAT DES ÉLÈVES EN LYCÉE']
];

function getTeacherAres(data, t) {
    return (data && data.ares && Array.isArray(data.ares[t])) ? data.ares[t] : [];
}

function areTotal(data, t) {
    return getTeacherAres(data, t).reduce((sum, a) => sum + (parseFloat(a.hours) || 0), 0);
}

function buildAreCellHtml(disc, t) {
    const data = dataStore[disc];
    const esc = escapeStructureHtml;
    const jsDisc = disc.replace(/'/g, "\\'");
    const jsT = t.replace(/'/g, "\\'");
    const chips = getTeacherAres(data, t).map((a, i) => `
        <div class="are-chip" title="${esc(a.label || a.short)}">
            <span class="are-chip-name">${esc(a.short)}</span>
            <input type="number" min="0" step="0.5" value="${a.hours}" oninput="updateAreHours('${jsDisc}', '${jsT}', ${i}, this.value, this)">
            <button type="button" class="are-chip-del" title="Supprimer cet ARE" onclick="deleteAre('${jsDisc}', '${jsT}', ${i})">✕</button>
        </div>`).join('');
    return `${chips}<button type="button" class="are-add-btn" onclick="openAreModal('${jsDisc}', '${jsT}')">+ ARE</button>`;
}

let areModalCtx = null;

function openAreModal(disc, teacher) {
    areModalCtx = { disc, teacher };
    document.getElementById('areModalTeacher').textContent = teacher;
    const sel = document.getElementById('areSelect');
    sel.innerHTML = ARE_CATALOG.map(([short, label], i) => `<option value="${i}">${escapeStructureHtml(short)} — ${escapeStructureHtml(label)}</option>`).join('')
        + '<option value="custom">Autre (libellé personnalisé)…</option>';
    document.getElementById('areCustomLabel').value = '';
    document.getElementById('areCustomShort').value = '';
    document.getElementById('areHours').value = '';
    onAreSelectChange();
    document.getElementById('areModal').classList.add('active');
}

function closeAreModal() {
    document.getElementById('areModal').classList.remove('active');
    areModalCtx = null;
}

function onAreSelectChange() {
    const custom = document.getElementById('areSelect').value === 'custom';
    document.getElementById('areCustomFields').style.display = custom ? 'block' : 'none';
}

function confirmAddAre() {
    if (!areModalCtx) return;
    const { disc, teacher } = areModalCtx;
    const selVal = document.getElementById('areSelect').value;
    let short, label;
    if (selVal === 'custom') {
        label = document.getElementById('areCustomLabel').value.trim();
        short = document.getElementById('areCustomShort').value.trim();
        if (!label || !short) { alert('Veuillez renseigner le libellé et le libellé court.'); return; }
    } else {
        [short, label] = ARE_CATALOG[parseInt(selVal, 10)];
    }
    const hours = parseFloat(String(document.getElementById('areHours').value).replace(',', '.'));
    if (!(hours >= 0) || isNaN(hours)) { alert("Veuillez indiquer un nombre d'heures."); return; }
    const data = dataStore[disc];
    if (!data.ares) data.ares = {};
    if (!data.ares[teacher]) data.ares[teacher] = [];
    data.ares[teacher].push({ short, label, hours });
    closeAreModal();
    renderApp();
}

function updateAreHours(disc, teacher, index, value, inputEl) {
    const data = dataStore[disc];
    const a = data && data.ares && data.ares[teacher] && data.ares[teacher][index];
    if (!a) return;
    a.hours = parseFloat(value) || 0;
    const table = inputEl.closest('table');
    if (table) refreshDisciplineTotals(table, data, disc);
}

function deleteAre(disc, teacher, index) {
    const data = dataStore[disc];
    if (!data || !data.ares || !data.ares[teacher]) return;
    data.ares[teacher].splice(index, 1);
    if (data.ares[teacher].length === 0) delete data.ares[teacher];
    renderApp();
}


// ============================================================
// Fenêtre ARE : récapitulatif par ARE, regroupé par volume horaire
// ============================================================
function openAreListModal() {
    renderAreList();
    document.getElementById('areListModal').classList.add('active');
}

function closeAreListModal() {
    document.getElementById('areListModal').classList.remove('active');
}

// Regroupe les ARE saisis : une entrée par ARE, puis par volume horaire (les plus grands d'abord)
function buildAreGroups() {
    const byAre = {};
    Object.keys(dataStore).forEach(disc => {
        const ares = dataStore[disc].ares || {};
        Object.keys(ares).forEach(t => {
            (ares[t] || []).forEach(a => {
                const hours = parseFloat(a.hours) || 0;
                const key = (a.short || '').trim().toLowerCase();
                if (!byAre[key]) byAre[key] = { short: a.short, label: a.label || '', byHours: {} };
                const g = byAre[key];
                if (!g.byHours[hours]) g.byHours[hours] = [];
                g.byHours[hours].push({ t, disc });
            });
        });
    });
    return Object.values(byAre).sort((x, y) => x.short.localeCompare(y.short, 'fr'));
}

// Lignes <tr> d'un ARE (nom et volume centrés, enseignants les uns sous les autres)
function areGroupRowsHtml(g) {
    const esc = escapeStructureHtml;
    const fmt = n => String(Math.round(n * 100) / 100).replace('.', ',');
    const hourKeys = Object.keys(g.byHours).map(Number).sort((a, b) => b - a);
    return hourKeys.map((hv, i) => {
        const people = g.byHours[hv].slice().sort((x, y) => x.t.localeCompare(y.t, 'fr'));
        const peopleHtml = people.map(p => `<div class="are-list-person">${esc(p.t)} <span>(${esc(p.disc)})</span></div>`).join('');
        return `<tr${i === 0 ? ' class="are-list-first"' : ''}>`
            + (i === 0 ? `<td rowspan="${hourKeys.length}" class="are-list-name"><strong>${esc(g.short)}</strong><small>${esc(g.label)}</small></td>` : '')
            + `<td class="num are-list-hours">${fmt(hv)} h</td><td>${peopleHtml}</td><td class="num are-list-hours">${fmt(hv * people.length)} h</td></tr>`;
    }).join('');
}

// Total général : somme, pour chaque ARE, du volume horaire × nombre d'enseignants
function areTotalRowHtml(list) {
    const fmt = n => String(Math.round(n * 100) / 100).replace('.', ',');
    let total = 0, nbTeachers = 0;
    list.forEach(g => Object.keys(g.byHours).forEach(hv => {
        total += parseFloat(hv) * g.byHours[hv].length;
        nbTeachers += g.byHours[hv].length;
    }));
    return `<tr class="are-list-total pres-total"><td colspan="3" style="text-align: center;">Total</td><td class="num">${fmt(total)} h</td></tr>`;
}

const ARE_LIST_HEAD = '<tr><th class="are-list-name">ARE</th><th class="num">Volume horaire</th><th>Nom de l\'enseignant</th><th class="num">Total</th></tr>';

function renderAreList() {
    const list = buildAreGroups();
    const container = document.getElementById('areListContent');
    if (list.length === 0) {
        container.innerHTML = '<p class="empty-state">Aucun ARE saisi pour le moment. Ils s\'ajoutent sous la ligne HSA de chaque discipline.</p>';
        return;
    }
    container.innerHTML = `
        <table class="are-list-table">
            <thead>${ARE_LIST_HEAD}</thead>
            <tbody>${list.map(areGroupRowsHtml).join('')}</tbody>
            <tfoot>${areTotalRowHtml(list)}</tfoot>
        </table>`;
}

// Export PDF paysage de la synthèse des ARE, dans le style du PDF de présentation
function exportAreListPdf() {
    const list = buildAreGroups();
    if (list.length === 0) { alert('Aucun ARE à exporter.'); return; }
    const esc = escapeStructureHtml;
    const dateStr = new Date().toLocaleDateString('fr-FR');
    const epleName = epleIdentity && epleIdentity.name ? epleIdentity.name : '';
    const PAGE_INNER_PX = Math.floor(188 * 96 / 25.4) - 52;
    const TITLE_RESERVE = 70;

    const measureBox = document.createElement('div');
    measureBox.className = 'pres-measure';
    document.body.appendChild(measureBox);
    const groupsHtml = list.map(areGroupRowsHtml).concat([areTotalRowHtml(list)]);
    measureBox.innerHTML = `<table class="pres-table pres-are-table"><thead>${ARE_LIST_HEAD}</thead>${groupsHtml.map(g => `<tbody>${g}</tbody>`).join('')}</table>`;
    const theadH = measureBox.querySelector('thead').offsetHeight;
    const heights = Array.from(measureBox.querySelectorAll('tbody')).map(tb => tb.offsetHeight);
    document.body.removeChild(measureBox);

    const avail = PAGE_INNER_PX - TITLE_RESERVE - theadH;
    const pagesRows = [[]];
    let used = 0;
    groupsHtml.forEach((g, i) => {
        const cur = pagesRows[pagesRows.length - 1];
        if (cur.length > 0 && used + heights[i] > avail) { pagesRows.push([]); used = 0; }
        pagesRows[pagesRows.length - 1].push(g);
        used += heights[i];
    });

    const total = pagesRows.length;
    const footerLabel = `${esc(epleName)}${epleName ? ' · ' : ''}Synthèse des ARE - ${dateStr}`;
    const container = document.getElementById('presentationPrint');
    container.innerHTML = pagesRows.map((rows, i) => `
        <section class="pres-page">
            <h1 class="pres-title">Synthèse des ARE${total > 1 ? ` <small>(suite ${i + 1}/${total})</small>` : ''}</h1>
            <table class="pres-table pres-are-table"><thead>${ARE_LIST_HEAD}</thead>${rows.map(r => `<tbody>${r}</tbody>`).join('')}</table>
            <div class="pres-footer"><span>${footerLabel}</span><span>${i + 1}/${total}</span></div>
        </section>`).join('');

    document.body.classList.add('printing-presentation');
    const cleanup = () => {
        document.body.classList.remove('printing-presentation');
        container.innerHTML = '';
        window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    triggerPrint();
}


// ============================================================
// 🪄 Ventilation automatique des heures d'une discipline
// ============================================================
let magicCtx = null;

// Calcule (sans rien modifier de façon durable) la répartition proposée.
// - seuls les services non verrouillés et hors co-enseignement sont traités
// - les heures déjà ventilées sont conservées : on ne répartit que le reste à ventiler
// - chaque classe (bloc d'un « Vol. classe ») est confiée à un seul enseignant
// - on vise l'ORS de chacun (pondérations et ARE comprises) en limitant les HSA :
//   1) un bloc est placé chez un enseignant dont le total reste ≤ ORS, en privilégiant
//      ceux qui ont déjà des heures au même niveau, puis celui qui « remplit » le mieux son ORS ;
//   2) si aucun ne peut l'absorber, il va chez celui qui dépasse le moins (HSA), à niveau égal.
// - les gros services sont placés d'abord, les petits (≤ 1 h : AP, EMC, section…) ensuite,
//   de façon à suivre les enseignants déjà présents sur le niveau.
function planMagicVentilation(disc, limitOrs) {
    const data = dataStore[disc];
    const teachers = data.teachers.slice();
    const load = {}, ors = {}, added = {}, levelsOf = {};
    teachers.forEach(t => {
        const sm = computeTeacherSummary(disc, t);
        load[t] = sm.total;
        ors[t] = sm.apport;
        added[t] = 0;
        levelsOf[t] = new Set();
    });
    data.services.forEach(sv => teachers.forEach(t => {
        if ((parseFloat(sv.allocations && sv.allocations[t]) || 0) > 0) levelsOf[t].add(sv.level);
    }));

    const todo = [];
    data.services.forEach((sv, sIndex) => {
        if (sv.locked || sv.isCoEnseignement) return;
        const target = (sv.classes || 0) * (sv.hours || 0);
        let done = 0;
        Object.values(sv.allocations || {}).forEach(v => { done += parseFloat(v) || 0; });
        const left = Math.round((target - done) * 100) / 100;
        if (left > 0.004) todo.push({ sv, sIndex, left });
    });
    const isSmall = sv => (sv.hours || 0) <= 1;
    todo.sort((a, b) => (isSmall(a.sv) - isSmall(b.sv)) || (b.left - a.left));

    // Les totaux (pondérations incluses) sont recalculés en ajoutant réellement le bloc, puis on restaure.
    const backup = data.services.map(sv => JSON.parse(JSON.stringify(sv.allocations || {})));
    const totalIf = (sv, t, h) => {
        if (!sv.allocations) sv.allocations = {};
        const prev = sv.allocations[t];
        sv.allocations[t] = (parseFloat(prev) || 0) + h;
        const tot = computeTeacherSummary(disc, t).total;
        if (prev === undefined) delete sv.allocations[t]; else sv.allocations[t] = prev;
        return tot;
    };

    const assignments = {};          // clé sIndex|t -> heures ajoutées
    const unplaced = [];
    const cur = {};
    teachers.forEach(t => { cur[t] = load[t]; });
    try {
        todo.forEach(({ sv, sIndex, left }) => {
            const unit = (sv.hours || 0) > 0 ? sv.hours : left;
            let rest = left;
            while (rest > 0.004 && teachers.length > 0) {
                const block = Math.min(unit, rest);
                const cands = teachers.map(t => {
                    const after = totalIf(sv, t, block);
                    return { t, after, over: Math.max(0, after - ors[t]), sameLevel: levelsOf[t].has(sv.level) ? 1 : 0 };
                });
                const fit = cands.filter(c => c.over < 0.004);
                let pool, pick;
                if (fit.length) {
                    pool = fit;
                    // niveau déjà présent d'abord ; puis le plus petit ORS restant (meilleur remplissage)
                    pick = pool.sort((a, b) => (b.sameLevel - a.sameLevel) || ((ors[a.t] - a.after) - (ors[b.t] - b.after)))[0];
                } else {
                    if (limitOrs) break;
                    // dépassement inévitable : le moins de HSA, à niveau égal en priorité
                    pick = cands.sort((a, b) => (b.sameLevel - a.sameLevel) || (a.over - b.over))[0];
                    const minOver = Math.min(...cands.map(c => c.over));
                    if (pick.over - minOver > block / 2 + 0.004) pick = cands.sort((a, b) => a.over - b.over)[0];
                }
                const t = pick.t;
                if (!sv.allocations) sv.allocations = {};
                sv.allocations[t] = Math.round(((parseFloat(sv.allocations[t]) || 0) + block) * 100) / 100;
                const key = sIndex + '|' + t;
                assignments[key] = (assignments[key] || 0) + block;
                cur[t] = pick.after;
                levelsOf[t].add(sv.level);
                rest = Math.round((rest - block) * 100) / 100;
            }
            if (rest > 0.004) unplaced.push({ name: sv.name || '(sans intitulé)', level: sv.level || '', left: rest });
        });
    } finally {
        data.services.forEach((sv, i) => { sv.allocations = backup[i]; });
    }
    teachers.forEach(t => { added[t] = Math.round((cur[t] - load[t]) * 100) / 100; });
    const list = Object.keys(assignments).map(k => {
        const [i, ...t] = k.split('|');
        return { sIndex: parseInt(i, 10), t: t.join('|'), h: Math.round(assignments[k] * 100) / 100 };
    });
    const totalLeft = todo.reduce((x, y) => x + y.left, 0);
    const totalPlaced = list.reduce((x, y) => x + y.h, 0);
    return { list, unplaced, teachers, load, ors, added, totalLeft, totalPlaced, nbServices: todo.length };
}

function openMagicModal(disc) {
    magicCtx = { disc, snapshot: null };
    renderMagicModal();
    document.getElementById('magicModal').classList.add('active');
}

function closeMagicModal() {
    document.getElementById('magicModal').classList.remove('active');
    magicCtx = null;
}

function renderMagicModal() {
    if (!magicCtx) return;
    const esc = escapeStructureHtml;
    const fmt = n => String(Math.round(n * 100) / 100).replace('.', ',');
    const disc = magicCtx.disc;
    const content = document.getElementById('magicContent');
    document.getElementById('magicTitle').textContent = `🪄 Ventilation automatique — ${disc}`;

    if (magicCtx.snapshot) {
        content.innerHTML = `
            <p class="magic-result">✅ La ventilation a été appliquée.</p>
            <div style="display:flex; justify-content:flex-end; gap:8px; margin-top: 16px;">
                <button class="btn-secondary" type="button" onclick="undoMagicVentilation()">↩️ Annuler la ventilation</button>
                <button class="btn-primary" type="button" onclick="closeMagicModal()">Fermer</button>
            </div>`;
        return;
    }

    if (dataStore[disc].teachers.length === 0) {
        content.innerHTML = `
            <p class="magic-intro">Cette discipline n'a aucun enseignant : ajoutez-en un pour pouvoir ventiler les heures.</p>
            <div style="display:flex; justify-content:flex-end; margin-top: 16px;"><button class="btn-primary" type="button" onclick="closeMagicModal()">Fermer</button></div>`;
        return;
    }
    const limitOrs = false;
    const plan = planMagicVentilation(disc, limitOrs);
    const rowsHtml = plan.teachers.filter(t => plan.added[t] > 0.004).map(t => {
        const after = plan.load[t] + plan.added[t];
        const hsa = after - plan.ors[t];
        return `<tr><td>${esc(t)}</td><td class="num">${fmt(plan.load[t])} h</td><td class="num"><strong>+ ${fmt(plan.added[t])} h</strong></td><td class="num">${fmt(after)} h</td><td class="num">${fmt(plan.ors[t])} h</td><td class="num">${hsa > 0.004 ? '+' : ''}${fmt(hsa)} h</td></tr>`;
    }).join('');
    const unplacedHtml = plan.unplaced.length
        ? `<div class="magic-warn">Ne pourront pas être ventilées (${fmt(plan.unplaced.reduce((x, y) => x + y.left, 0))} h) : ${plan.unplaced.map(u => `${esc(u.name)}${u.level ? ' (' + esc(u.level) + ')' : ''} — ${fmt(u.left)} h`).join(' ; ')}.</div>`
        : '';

    content.innerHTML = `
        <p class="magic-intro">Répartit entre les enseignants de la discipline les heures <strong>restant à ventiler</strong>, classe par classe, en visant l'ORS de chacun (pondérations et ARE comprises) et en privilégiant la continuité par niveau. Les heures déjà attribuées sont conservées ; les services verrouillés (🔒) et en co-enseignement sont ignorés.</p>
        ${plan.nbServices === 0
            ? '<p class="magic-result">Il n\'y a aucune heure à ventiler dans cette discipline.</p>'
            : `<div class="magic-summary"><span>À ventiler : <strong>${fmt(plan.totalLeft)} h</strong> sur ${plan.nbServices} service${plan.nbServices > 1 ? 's' : ''}</span><span>Répartition proposée : <strong>${fmt(plan.totalPlaced)} h</strong></span></div>
               ${plan.teachers.length === 0 ? '<div class="magic-warn">Cette discipline n\'a aucun enseignant.</div>' : ''}
               ${rowsHtml ? `<table class="magic-table"><thead><tr><th>Enseignant</th><th class="num">Actuel</th><th class="num">Ajout</th><th class="num">Après</th><th class="num">ORS</th><th class="num">HSA</th></tr></thead><tbody>${rowsHtml}</tbody></table>` : ''}
               ${unplacedHtml}`}
        <div style="display:flex; justify-content:flex-end; gap:8px; margin-top: 16px;">
            <button class="btn-secondary" type="button" onclick="closeMagicModal()">Annuler</button>
            <button class="btn-primary" type="button" onclick="applyMagicVentilation()" ${plan.totalPlaced > 0.004 ? '' : 'disabled'}>🪄 Appliquer la ventilation</button>
        </div>`;
}

function applyMagicVentilation() {
    if (!magicCtx) return;
    const disc = magicCtx.disc;
    const data = dataStore[disc];
    const plan = planMagicVentilation(disc, false);
    if (plan.list.length === 0) return;
    // copie pour pouvoir annuler
    magicCtx.snapshot = data.services.map(sv => JSON.parse(JSON.stringify(sv.allocations || {})));
    plan.list.forEach(a => {
        const sv = data.services[a.sIndex];
        if (!sv.allocations) sv.allocations = {};
        sv.allocations[a.t] = Math.round(((parseFloat(sv.allocations[a.t]) || 0) + a.h) * 100) / 100;
    });
    renderApp();
    renderMagicModal();
}

function undoMagicVentilation() {
    if (!magicCtx || !magicCtx.snapshot) return;
    const data = dataStore[magicCtx.disc];
    magicCtx.snapshot.forEach((alloc, i) => { if (data.services[i]) data.services[i].allocations = alloc; });
    renderApp();
    closeMagicModal();
}


// ============================================================
// 👤 Coordonnateurs de discipline
// ============================================================
// Chaque entrée regroupe une ou plusieurs disciplines associées et leurs coordonnateurs (un ou plusieurs).
function normalizeCoordinators() {
    const discs = Object.keys(dataStore);
    const seen = new Set();
    const list = [];
    coordinators.forEach(e => {
        const ds = (e.discs || []).filter(d => dataStore[d] && !seen.has(d));
        ds.forEach(d => seen.add(d));
        if (!ds.length) return;
        // ancien format : { teacher, email }
        let coords = Array.isArray(e.coords) ? e.coords : (e.teacher ? [{ teacher: e.teacher, email: e.email || '' }] : []);
        list.push({ discs: ds, coords: coords.map(c => ({ teacher: c.teacher || '', email: c.email || '' })) });
    });
    discs.forEach(d => { if (!seen.has(d)) list.push({ discs: [d], coords: [] }); });
    list.sort((a, b) => discs.indexOf(a.discs[0]) - discs.indexOf(b.discs[0]));
    list.forEach(e => {
        const names = coordTeacherOptions(e).map(o => o.name);
        e.coords.forEach(c => { if (c.teacher && !names.includes(c.teacher)) c.teacher = ''; });
        if (e.coords.length === 0) e.coords.push({ teacher: '', email: '' });
    });
    coordinators = list;
    return list;
}

function coordTeacherOptions(entry) {
    const out = [];
    entry.discs.forEach(d => ((dataStore[d] && dataStore[d].teachers) || []).forEach(t => out.push({ name: t, disc: d })));
    return out;
}

function openCoordinatorsModal() {
    renderCoordinatorsContent();
    document.getElementById('coordinatorsModal').classList.add('active');
}

function closeCoordinatorsModal() {
    document.getElementById('coordinatorsModal').classList.remove('active');
}

function renderCoordinatorsContent() {
    const esc = escapeStructureHtml;
    const container = document.getElementById('coordinatorsContent');
    const list = normalizeCoordinators();
    if (list.length === 0) {
        container.innerHTML = '<p class="empty-state">Aucune discipline : ajoutez-en pour désigner des coordonnateurs.</p>';
        return;
    }
    const allDiscs = Object.keys(dataStore);
    const rows = list.map((e, i) => {
        const merged = e.discs.length > 1;
        const discHtml = e.discs.map((d, k) => `<span class="coord-disc">${esc(d)}${merged ? `<button type="button" class="coord-unlink" title="Dissocier cette discipline" onclick="coordDissociate(${i}, ${k})">✕</button>` : ''}</span>`).join('');
        const opts = coordTeacherOptions(e);
        const coordsHtml = e.coords.map((c, j) => `
            <div class="coord-line">
                <select onchange="coordSetTeacher(${i}, ${j}, this.value)">
                    <option value="">— Choisir un enseignant —</option>
                    ${opts.map(o => `<option value="${esc(o.name)}" ${o.name === c.teacher ? 'selected' : ''}>${esc(o.name)}${merged ? ` (${esc(o.disc)})` : ''}</option>`).join('')}
                </select>
                <input type="email" placeholder="adresse@exemple.fr" value="${esc(c.email)}" oninput="coordSetEmail(${i}, ${j}, this.value)">
                ${e.coords.length > 1 ? `<button type="button" class="coord-unlink" title="Retirer ce coordonnateur" onclick="coordRemove(${i}, ${j})">✕</button>` : '<span class="coord-unlink-spacer"></span>'}
            </div>`).join('');
        const others = allDiscs.filter(d => !e.discs.includes(d));
        const assoc = others.length
            ? `<select onchange="coordAssociate(${i}, this.value)"><option value="">Associer à…</option>${others.map(d => `<option value="${esc(d)}">${esc(d)}</option>`).join('')}</select>`
            : '';
        return `<tr><td><div class="coord-discs">${discHtml}</div></td>
            <td>${coordsHtml}<button type="button" class="coord-add" onclick="coordAdd(${i})">+ Ajouter un coordonnateur</button></td>
            <td>${assoc}</td></tr>`;
    }).join('');
    container.innerHTML = `
        <p class="settings-tab-hint" style="margin-bottom: 10px;">Désignez un ou plusieurs coordonnateurs parmi les enseignants de chaque discipline, avec leur adresse mail. Deux disciplines peuvent être associées (par exemple Lettres classiques et Lettres modernes) ; les coordonnateurs sont alors choisis parmi les enseignants des deux.</p>
        <table class="coord-table">
            <thead><tr><th>Discipline(s)</th><th>Coordonnateur(s) et adresse mail</th><th>Association</th></tr></thead>
            <tbody>${rows}</tbody>
        </table>`;
}

function coordSetTeacher(i, j, value) { if (coordinators[i] && coordinators[i].coords[j]) coordinators[i].coords[j].teacher = value; }
function coordSetEmail(i, j, value) { if (coordinators[i] && coordinators[i].coords[j]) coordinators[i].coords[j].email = value.trim(); }
function coordAdd(i) { if (coordinators[i]) { coordinators[i].coords.push({ teacher: '', email: '' }); renderCoordinatorsContent(); } }
function coordRemove(i, j) {
    if (!coordinators[i] || coordinators[i].coords.length < 2) return;
    coordinators[i].coords.splice(j, 1);
    renderCoordinatorsContent();
}

function coordAssociate(i, disc) {
    if (!disc || !coordinators[i]) return;
    const j = coordinators.findIndex(e => e.discs.includes(disc));
    if (j === -1 || j === i) return;
    const a = coordinators[i], b = coordinators[j];
    a.discs = a.discs.concat(b.discs);
    a.coords = a.coords.filter(c => c.teacher || c.email).concat(b.coords.filter(c => c.teacher || c.email));
    coordinators.splice(j, 1);
    renderCoordinatorsContent();
}

function coordDissociate(i, k) {
    const e = coordinators[i];
    if (!e || e.discs.length < 2) return;
    const d = e.discs.splice(k, 1)[0];
    const own = new Set(((dataStore[d] && dataStore[d].teachers) || []));
    const moved = e.coords.filter(c => c.teacher && own.has(c.teacher) && !coordTeacherOptions(e).some(o => o.name === c.teacher));
    e.coords = e.coords.filter(c => !moved.includes(c));
    coordinators.push({ discs: [d], coords: moved });
    renderCoordinatorsContent();
}

// Export PDF de la liste des coordonnateurs (style du PDF de présentation, paysage)
function exportCoordinatorsPdf() {
    const esc = escapeStructureHtml;
    const rowsData = normalizeCoordinators()
        .map(e => ({ discs: e.discs, coords: e.coords.filter(c => c.teacher).sort((x, y) => x.teacher.localeCompare(y.teacher, 'fr')) }))
        .filter(e => e.coords.length > 0);
    if (rowsData.length === 0) { alert('Aucun coordonnateur désigné à exporter.'); return; }
    const dateStr = new Date().toLocaleDateString('fr-FR');
    const epleName = epleIdentity && epleIdentity.name ? epleIdentity.name : '';
    const PAGE_INNER_PX = Math.floor(188 * 96 / 25.4) - 52;
    const TITLE_RESERVE = 70;
    const head = '<tr><th style="width:32%">Enseignant(s)</th><th>Discipline(s) coordonnée(s)</th><th style="width:34%">Adresse mail</th></tr>';
    const rows = rowsData.map(e => `<tr>
        <td>${e.coords.map(c => `<div class="coord-pdf-line"><strong>${esc(c.teacher)}</strong></div>`).join('')}</td>
        <td>${e.discs.map(esc).join(' / ')}</td>
        <td>${e.coords.map(c => `<div class="coord-pdf-line">${esc(c.email) || '&nbsp;'}</div>`).join('')}</td></tr>`);

    const measureBox = document.createElement('div');
    measureBox.className = 'pres-measure';
    document.body.appendChild(measureBox);
    measureBox.innerHTML = `<table class="pres-table"><thead>${head}</thead><tbody>${rows.join('')}</tbody></table>`;
    const theadH = measureBox.querySelector('thead').offsetHeight;
    const heights = Array.from(measureBox.querySelectorAll('tbody tr')).map(tr => tr.offsetHeight);
    document.body.removeChild(measureBox);

    const avail = PAGE_INNER_PX - TITLE_RESERVE - theadH;
    const pagesRows = [[]];
    let used = 0;
    rows.forEach((r, i) => {
        const cur = pagesRows[pagesRows.length - 1];
        if (cur.length > 0 && used + heights[i] > avail) { pagesRows.push([]); used = 0; }
        pagesRows[pagesRows.length - 1].push(r);
        used += heights[i];
    });

    const total = pagesRows.length;
    const footerLabel = `${esc(epleName)}${epleName ? ' · ' : ''}Coordonnateurs - ${dateStr}`;
    const container = document.getElementById('presentationPrint');
    container.innerHTML = pagesRows.map((pr, i) => `
        <section class="pres-page">
            <h1 class="pres-title">Coordonnateurs de discipline${total > 1 ? ` <small>(suite ${i + 1}/${total})</small>` : ''}</h1>
            <table class="pres-table"><thead>${head}</thead><tbody>${pr.join('')}</tbody></table>
            <div class="pres-footer"><span>${footerLabel}</span><span>${i + 1}/${total}</span></div>
        </section>`).join('');

    document.body.classList.add('printing-presentation');
    const cleanup = () => {
        document.body.classList.remove('printing-presentation');
        container.innerHTML = '';
        window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    triggerPrint();
}


// ------------------------------------------------------------
// ✉️ Envoi d'un email aux coordonnateurs
// ------------------------------------------------------------
const COORD_MAIL_SUBJECT = 'Tableaux de ventilation de la DHG';
const COORD_MAIL_BODY = ['Chères collègues, chers collègues,', '', 'Je vous prie de trouver en pièce jointe les tableaux de ventilation de la DHG.', '', 'Je vous souhaite bonne réception du document.', '', 'Bien cordialement,'].join('\r\n');

function getCoordinatorEmails() {
    const out = [];
    normalizeCoordinators().forEach(e => e.coords.forEach(c => {
        const m = (c.email || '').trim();
        if (m && m.includes('@') && !out.some(x => x.toLowerCase() === m.toLowerCase())) out.push(m);
    }));
    return out;
}

function openCoordMailModal() {
    const emails = getCoordinatorEmails();
    if (emails.length === 0) { alert("Aucune adresse mail n'est renseignée pour les coordonnateurs."); return; }
    document.getElementById('coordMailInfo').innerHTML = `<strong>${emails.length}</strong> destinataire${emails.length > 1 ? 's' : ''} : <span class="coord-mail-list">${emails.map(escapeStructureHtml).join(' ; ')}</span>`;
    document.getElementById('coordMailModal').classList.add('active');
    prepareCoordMailFile();
}

function closeCoordMailModal() {
    document.getElementById('coordMailModal').classList.remove('active');
}

// Message simple, sans pièce jointe : ouvre la messagerie par défaut (un lien mailto ne peut pas joindre de fichier)
function coordMailOpenClient() {
    const emails = getCoordinatorEmails();
    const href = 'mailto:' + emails.map(encodeURIComponent).join(',')
        + '?subject=' + encodeURIComponent(COORD_MAIL_SUBJECT)
        + '&body=' + encodeURIComponent(COORD_MAIL_BODY);
    window.location.href = href;
}

function coordMailCopyEmails() {
    const text = getCoordinatorEmails().join('; ');
    const done = () => alert('Adresses copiées : ' + text);
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, () => prompt('Copiez les adresses :', text));
    else prompt('Copiez les adresses :', text);
}

function utf8ToBase64(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = '';
    bytes.forEach(b => { bin += String.fromCharCode(b); });
    return btoa(bin);
}

// Construit un brouillon .eml (X-Unsent) avec destinataires, corps et pièce jointe encodée en base64
function buildEmlDraft(recipients, subject, body, attachment) {
    const boundary = '----=_DHG_' + Date.now().toString(16);
    const chunk = b64 => (b64.match(/.{1,76}/g) || []).join('\r\n');
    const lines = [
        'X-Unsent: 1',
        'X-Uniform-Type-Identifier: com.apple.mail-draft',
        'To: ' + recipients.join(', '),
        'Subject: =?UTF-8?B?' + utf8ToBase64(subject) + '?=',
        'MIME-Version: 1.0',
        'Content-Type: multipart/mixed; boundary="' + boundary + '"',
        '',
        '--' + boundary,
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        '',
        chunk(utf8ToBase64(body)),
        '--' + boundary
    ];
    if (attachment) {
        const asciiName = attachment.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9._-]+/g, '_');
        lines.push(
            'Content-Type: ' + attachment.type + '; name="' + asciiName + '"',
            'Content-Disposition: attachment; filename="' + asciiName + '"; filename*=UTF-8\'\'' + encodeURIComponent(attachment.name),
            'Content-Transfer-Encoding: base64',
            '',
            chunk(attachment.base64),
            '--' + boundary
        );
    }
    lines[lines.length - 1] += '--';
    lines.push('');
    return lines.join('\r\n');
}

function buildCoordMailWorkbook() {
    const used = new Set();
    const sheets = [styledTrmdSheet()].concat(Object.keys(dataStore).map(d => styledDisciplineSheet(d))).map(sh => {
        let n = sh.name, i = 2;
        while (used.has(n.toLowerCase())) { n = sh.name.slice(0, 27) + ' (' + i++ + ')'; }
        used.add(n.toLowerCase());
        return Object.assign({}, sh, { name: n });
    });
    const base64 = bytesToBase64(buildStyledXlsxBytes(sheets));
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const dateStr = `${now.getFullYear()}_${pad(now.getMonth() + 1)}_${pad(now.getDate())}`;
    const epleName = ((epleIdentity && epleIdentity.name) || '').trim().replace(/[\\/:*?"<>|]+/g, ' ').replace(/\s+/g, '_').replace(/^_+|_+$/g, '') || 'EPLE';
    return { base64, fileName: `${dateStr}_DHG_${epleName}.xlsx`, dateStr, epleName };
}

// Fichier préparé à l'avance : le partage système exige d'être déclenché immédiatement par le clic
let coordMailFile = null;
async function prepareCoordMailFile() {
    coordMailFile = null;
    try {
        const { base64, fileName } = buildCoordMailWorkbook();
        const bin = atob(base64);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        coordMailFile = new File([bytes], fileName, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    } catch (err) { coordMailFile = null; }
}

// Partage système (Mail sur Mac / iPhone) : le classeur est joint ; les adresses sont copiées dans le presse-papiers
function coordMailShare() {
    const emails = getCoordinatorEmails();
    if (!coordMailFile) { alert('Le fichier est en cours de préparation, réessayez dans un instant.'); return; }
    if (!navigator.share || !navigator.canShare || !navigator.canShare({ files: [coordMailFile] })) {
        alert("Le partage de fichier n'est pas disponible dans ce navigateur. Utilisez le brouillon .eml.");
        return;
    }
    try { if (navigator.clipboard) navigator.clipboard.writeText(emails.join(', ')); } catch (e) { /* facultatif */ }
    navigator.share({ files: [coordMailFile], title: COORD_MAIL_SUBJECT, text: COORD_MAIL_BODY.replace(/\r\n/g, '\n') }).catch(() => {});
}

async function coordMailDownloadDraft() {
    const emails = getCoordinatorEmails();
    if (emails.length === 0) return;

    const { base64, fileName, dateStr, epleName } = buildCoordMailWorkbook();
    const eml = buildEmlDraft(emails, COORD_MAIL_SUBJECT, COORD_MAIL_BODY, {
        name: fileName, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', base64
    });
    const blob = new Blob([eml], { type: 'message/rfc822' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dateStr}_Mail_DHG_${epleName}.eml`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}


// ============================================================
// 📊 Statistiques de la DHG : découpage en pourcentage
// ============================================================
const fmtPct = n => (Math.round(n * 10) / 10).toFixed(1).replace('.', ',') + ' %';
const fmtStatH = n => String(Math.round((n || 0) * 100) / 100).replace('.', ',') + ' h';

function computeDhgStats() {
    const discs = Object.keys(dataStore);
    const hp = parseFloat(dotationGlobal.hp) || 0, hsa = parseFloat(dotationGlobal.hsa) || 0, dgh = hp + hsa;
    const pctOf = (v, base) => base > 0 ? v / base * 100 : null;
    const hasPond = pondEnabled();

    // Par discipline et par niveau : heures réellement attribuées aux enseignants
    // (heures brutes, pondérations, ARE). Les pondérations d'un enseignant sont
    // réparties sur les niveaux de ses services au prorata de leur pondération brute ;
    // les ARE, qui ne dépendent d'aucun niveau, forment une ligne à part.
    const byDisc = [];
    const lvl = {};
    let tRaw = 0, tPond = 0, tAre = 0;
    const addLvl = (l, raw, pond) => { if (!lvl[l]) lvl[l] = { raw: 0, pond: 0 }; lvl[l].raw += raw; lvl[l].pond += pond; };
    discs.forEach(d => {
        const data = dataStore[d];
        let raw = 0, pond = 0, are = 0;
        (data.teachers || []).forEach(t => {
            const sm = computeTeacherSummary(d, t);
            raw += sm.raw; pond += sm.pond; are += sm.are;
            const sumRaw = sm.rows.reduce((x, r) => x + (r.pond || 0), 0);
            const k = sumRaw > 0 ? sm.pond / sumRaw : 0;
            sm.rows.forEach(r => {
                const ls = (r.levels && r.levels.length) ? r.levels : ['Non défini'];
                ls.forEach(l => addLvl(l, r.hours / ls.length, (r.pond || 0) * k / ls.length));
            });
        });
        tRaw += raw; tPond += pond; tAre += are;
        byDisc.push({ label: d, raw, weighted: raw + pond, are, h: raw + pond + are });
    });
    const grandTotal = tRaw + tPond + tAre;
    byDisc.forEach(r => { r.pct = pctOf(r.h, grandTotal); r.pct2 = pctOf(r.h, dgh); });

    const lvlOrder = l => { const i = levels.indexOf(l); return i === -1 ? 999 : i; };
    const byLevel = Object.keys(lvl).sort((a, b) => lvlOrder(a) - lvlOrder(b)).map(l => {
        const v = lvl[l];
        return { label: l, raw: v.raw, weighted: v.raw + v.pond, are: 0, h: v.raw + v.pond };
    });
    if (tAre > 0.004) byLevel.push({ label: 'ARE (non rattachés à un niveau)', raw: null, weighted: null, are: tAre, h: tAre, isAre: true });
    byLevel.forEach(r => { r.pct = pctOf(r.h, grandTotal); r.pct2 = pctOf(r.h, dgh); });

    const remaining = dgh - grandTotal;
    return {
        hp, hsa, dgh, grandTotal, hasPond, hasAre: tAre > 0.004, tRaw, tWeighted: tRaw + tPond, tAre,
        dotation: [{ label: 'Heures postes (HP)', h: hp, pct: pctOf(hp, dgh) }, { label: 'Heures supplémentaires (HSA)', h: hsa, pct: pctOf(hsa, dgh) }],
        usage: remaining >= 0
            ? [{ label: 'Heures ventilées', h: grandTotal, pct: pctOf(grandTotal, dgh) }, { label: 'Reste à utiliser (Norvégien)', h: remaining, pct: pctOf(remaining, dgh) }]
            : [{ label: 'Heures ventilées dans la dotation', h: dgh, pct: pctOf(dgh, dgh) }, { label: 'Dépassement de la dotation', h: -remaining, pct: pctOf(-remaining, dgh) }],
        byDisc, byLevel
    };
}

// Diagramme circulaire SVG (les parts à 100 % sont tracées en disque plein)
const PIE_COLORS = ['#1d4ed8', '#f59e0b', '#10b981', '#ef4444'];
function pieSvg(rows, size) {
    const r = size / 2, cx = r, cy = r;
    const valid = rows.filter(x => x.pct !== null && x.h > 0);
    let body = '';
    if (valid.length === 0) {
        body = `<circle cx="${cx}" cy="${cy}" r="${r - 2}" fill="#e5e7eb"/>`;
    } else if (valid.length === 1) {
        const i = rows.indexOf(valid[0]);
        body = `<circle cx="${cx}" cy="${cy}" r="${r - 2}" fill="${PIE_COLORS[i % PIE_COLORS.length]}"/>`;
    } else {
        const tot = valid.reduce((x, y) => x + y.h, 0);
        let ang = -Math.PI / 2;
        valid.forEach(x => {
            const i = rows.indexOf(x);
            const da = x.h / tot * Math.PI * 2;
            const x1 = cx + (r - 2) * Math.cos(ang), y1 = cy + (r - 2) * Math.sin(ang);
            ang += da;
            const x2 = cx + (r - 2) * Math.cos(ang), y2 = cy + (r - 2) * Math.sin(ang);
            body += `<path d="M${cx},${cy} L${x1.toFixed(2)},${y1.toFixed(2)} A${r - 2},${r - 2} 0 ${da > Math.PI ? 1 : 0} 1 ${x2.toFixed(2)},${y2.toFixed(2)} Z" fill="${PIE_COLORS[i % PIE_COLORS.length]}" stroke="#fff" stroke-width="1.5"/>`;
        });
    }
    return `<svg class="pie-svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" role="img">${body}</svg>`;
}
// Légende : pastille de couleur, libellé, heures et pourcentage
function pieLegend(rows, esc) {
    return `<ul class="pie-legend">${rows.map((x, i) => `<li><span class="pie-dot" style="background:${PIE_COLORS[i % PIE_COLORS.length]}"></span><span class="pie-lbl">${esc(x.label)}</span><span class="pie-val">${fmtStatH(x.h)} · <strong>${x.pct === null ? '—' : fmtPct(x.pct)}</strong></span></li>`).join('')}</ul>`;
}

function openStatsModal() {
    renderStatsContent();
    document.getElementById('statsModal').classList.add('active');
}
function closeStatsModal() { document.getElementById('statsModal').classList.remove('active'); }

// Colonnes des tableaux « par discipline » et « par niveau » (selon pondérations / ARE)
function statColumns(st) {
    const cols = [{ k: 'raw', label: 'Heures' }];
    if (st.hasPond) cols.push({ k: 'weighted', label: 'Heures pondérées' });
    if (st.hasAre) cols.push({ k: 'are', label: 'ARE' });
    if (st.hasPond || st.hasAre) cols.push({ k: 'h', label: 'Total', strong: true });
    return cols;
}
function statCell(r, c) {
    const v = c.k === 'h' && !(c.k in r) ? r.raw : r[c.k];
    if (v === null || v === undefined) return '—';
    if (c.k === 'are' && !(v > 0.004) && !r.isAre) return '—';
    return fmtStatH(v);
}

function renderStatsContent() {
    const esc = escapeStructureHtml;
    const box = document.getElementById('statsContent');
    if (Object.keys(dataStore).length === 0) { box.innerHTML = '<p class="empty-state">Aucune discipline configurée.</p>'; return; }
    const st = computeDhgStats();
    const p2 = st.dgh > 0;
    const bar = r => r.pct === null ? '' : `<div class="stat-bar"><span style="width:${Math.max(0, Math.min(100, r.pct)).toFixed(1)}%"></span></div>`;
    const card = (title, body, note) => `<div class="stat-card"><h3>${title}</h3>${body}${note ? `<div class="stat-note">${note}</div>` : ''}</div>`;
    const miniTable = rows => `<table class="stats-table"><thead><tr><th>Poste</th><th class="num">Heures</th><th class="num">Part</th></tr></thead><tbody>${rows.map(r => `<tr><td>${esc(r.label)}</td><td class="num">${fmtStatH(r.h)}</td><td class="num"><strong>${r.pct === null ? '—' : fmtPct(r.pct)}</strong></td></tr>`).join('')}</tbody></table>`;
    const pieCard = (title, rows, note) => card(title, `<div class="pie-row">${pieSvg(rows, 150)}<div class="pie-side">${pieLegend(rows, esc)}</div></div>`, note);

    const cols = statColumns(st);
    const bigTable = (rows, first, totalRow) => `<table class="stats-table"><thead><tr><th>${first}</th>${cols.map(c => `<th class="num">${c.label}</th>`).join('')}<th class="num">Part</th>${p2 ? '<th class="num">Part de la DHG</th>' : ''}<th style="width:22%">Répartition</th></tr></thead><tbody>${rows.map(r => `<tr><td>${esc(r.label)}</td>${cols.map(c => `<td class="num${c.strong ? ' stat-strong' : ''}">${statCell(r, c)}</td>`).join('')}<td class="num"><strong>${r.pct === null ? '—' : fmtPct(r.pct)}</strong></td>${p2 ? `<td class="num">${r.pct2 === null ? '—' : fmtPct(r.pct2)}</td>` : ''}<td class="stat-bar-cell">${bar(r)}</td></tr>`).join('')}${totalRow}</tbody></table>`;
    const totalRow = `<tr class="stat-total"><td>Total</td>${cols.map(c => `<td class="num">${fmtStatH(c.k === 'raw' ? st.tRaw : c.k === 'weighted' ? st.tWeighted : c.k === 'are' ? st.tAre : st.grandTotal)}</td>`).join('')}<td class="num">100 %</td>${p2 ? `<td class="num">${fmtPct(st.grandTotal / st.dgh * 100)}</td>` : ''}<td></td></tr>`;
    const baseNote = `Heures attribuées aux enseignants${st.hasPond || st.hasAre ? ' (' + esc(totalLabelSuffix()) + ')' : ''} : le total est identique à celui du TRMD.`;

    box.innerHTML = `
        <div class="stat-toolbar">
            <span class="stat-hint">Découpage en pourcentage de la DHG${st.dgh > 0 ? ` (${fmtStatH(st.dgh)})` : ''}.</span>
            <button class="btn-secondary" type="button" onclick="exportStatsPdf()">📄 Exporter en PDF</button>
        </div>
        ${st.dgh > 0 ? '' : '<div class="stat-warn">La dotation (HP / HSA) n\'est pas renseignée : les parts de la DHG ne peuvent pas être calculées.</div>'}
        <div class="stat-grid">
            ${pieCard('Répartition de la dotation', st.dotation)}
            ${pieCard('Utilisation de la dotation', st.usage, `Heures ventilées : total ${esc(totalLabelSuffix())}.`)}
        </div>
        ${card('Par discipline', bigTable(st.byDisc, 'Discipline', totalRow), baseNote)}
        ${card('Par niveau', bigTable(st.byLevel, 'Niveau', totalRow), baseNote + ' Les heures de chaque enseignant sont réparties selon le niveau de ses services (options multi-niveaux à parts égales) ; les ARE, qui ne dépendent d\'aucun niveau, sont sur une ligne à part.')}`;
}

// Export PDF : même mise en page que l'export pour la présentation, limité à cette rubrique
function exportStatsPdf() {
    const sections = {};
    PRESENTATION_SECTIONS.forEach(([k]) => { sections[k] = (k === 'stats'); });
    generatePresentationPdf({ sections, disciplines: Object.keys(dataStore), levels: levels.slice(), bare: true });
}

// ============================================================
// 📈 Comparaison N-1 : comparaison avec le fichier de l'année précédente
// ============================================================
let compareData = null;      // { name, metrics }
let compareTab = 'disc';
let compareOnlyChanges = true;
let compareExportOpts = { disc: true, svc: true, teach: true, onlyChanges: true };

// Calcule les indicateurs d'un jeu de données (en substituant temporairement les variables globales)
function computeDatasetMetrics(ds, ident, dotation) {
    const saveDs = dataStore, saveId = epleIdentity;
    dataStore = ds;
    epleIdentity = ident || {};
    try {
        const out = { dotation: dotation || { hp: 0, hsa: 0 }, disc: {}, services: {}, teachers: {} };
        Object.keys(ds).forEach(disc => {
            const d = ds[disc];
            if (!d.apports) d.apports = {};
            (d.services || []).forEach(sv => { if (!sv.allocations) sv.allocations = {}; });
            const m = { nbT: (d.teachers || []).length, hp: 0, raw: 0, hsa: 0, total: 0 };
            (d.teachers || []).forEach(t => {
                const sm = computeTeacherSummary(disc, t);
                m.hp += sm.apport; m.raw += sm.raw; m.hsa += sm.hsa; m.total += sm.total;
                if (!out.teachers[t]) out.teachers[t] = { discs: [], total: 0, hsa: 0 };
                const te = out.teachers[t];
                te.discs.push(disc); te.total += sm.total; te.hsa += sm.hsa;
            });
            out.disc[disc] = m;
            (d.services || []).forEach(sv => {
                const lvl = sv.isOptionnel && Array.isArray(sv.levels) && sv.levels.length ? sv.levels.join(', ') : (sv.level || '');
                const name = (sv.name || '').trim() || '(sans intitulé)';
                const key = lvl + '|' + name.toLowerCase();
                if (!out.services[key]) out.services[key] = { level: lvl, name, classes: 0, coMax: 0, hours: sv.hours || 0 };
                const e = out.services[key];
                const cl = parseFloat(sv.classes) || 0;
                if (sv.isCoEnseignement) e.coMax = Math.max(e.coMax, cl); else e.classes += cl;
            });
        });
        Object.values(out.services).forEach(e => { e.classes += e.coMax; e.volume = e.classes * e.hours; });
        return out;
    } finally {
        dataStore = saveDs;
        epleIdentity = saveId;
    }
}

function openCompareModal() {
    renderCompareContent();
    document.getElementById('compareModal').classList.add('active');
}

function closeCompareModal() {
    document.getElementById('compareModal').classList.remove('active');
}

function loadCompareFile(input) {
    const file = input.files && input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        try {
            const obj = JSON.parse(e.target.result);
            if (!obj || typeof obj.dataStore !== 'object') throw new Error('format');
            const ds = JSON.parse(JSON.stringify(obj.dataStore));
            compareData = {
                name: (obj.epleIdentity && obj.epleIdentity.name) || '',
                file: file.name,
                metrics: computeDatasetMetrics(ds, obj.epleIdentity || {}, obj.dotation)
            };
            renderCompareContent();
        } catch (err) {
            alert("Ce fichier n'est pas une sauvegarde valide (.json enregistrée depuis l'application).");
        }
        input.value = '';
    };
    reader.readAsText(file);
}

function switchCompareTab(tab) { compareTab = tab; renderCompareContent(); }
function toggleCompareOnlyChanges(v) { compareOnlyChanges = v; renderCompareContent(); }

function renderCompareContent() {
    const esc = escapeStructureHtml;
    const box = document.getElementById('compareContent');
    const fmt = n => String(Math.round(n * 100) / 100).replace('.', ',');
    const delta = n => {
        const r = Math.round(n * 100) / 100;
        if (Math.abs(r) < 0.005) return '<span class="cmp-delta zero">=</span>';
        return `<span class="cmp-delta ${r > 0 ? 'up' : 'down'}">${r > 0 ? '+' : ''}${fmt(r)}</span>`;
    };
    const loader = `<label class="btn-secondary cmp-load">📂 ${compareData ? 'Choisir un autre fichier N-1' : 'Choisir le fichier N-1 (.json)'}<input type="file" accept=".json" onchange="loadCompareFile(this)" style="display:none"></label>`;
    if (!compareData) {
        box.innerHTML = `<p class="settings-tab-hint">Chargez la sauvegarde (.json) de l'année précédente : l'application la compare à vos données actuelles (disciplines, services par niveau, enseignants). Ce fichier n'est ni modifié ni conservé.</p>${loader}`;
        return;
    }
    const cur = computeDatasetMetrics(dataStore, epleIdentity, dotationGlobal);
    const prev = compareData.metrics;
    const tabBtn = (k, label) => `<button class="level-tab-btn ${compareTab === k ? 'active' : ''}" onclick="switchCompareTab('${k}')">${label}</button>`;
    let body = '';

    if (compareTab === 'disc') {
        const names = Array.from(new Set(Object.keys(cur.disc).concat(Object.keys(prev.disc))));
        const z = { nbT: 0, hp: 0, raw: 0, hsa: 0, total: 0 };
        const tot = { p: Object.assign({}, z), c: Object.assign({}, z) };
        const rows = names.map(n => {
            const p = prev.disc[n], c = cur.disc[n];
            const pp = p || z, cc = c || z;
            Object.keys(z).forEach(k => { tot.p[k] += pp[k]; tot.c[k] += cc[k]; });
            const tag = !p ? ' <span class="cmp-tag new">nouvelle</span>' : (!c ? ' <span class="cmp-tag gone">absente</span>' : '');
            return `<tr><td><strong>${esc(n)}</strong>${tag}</td>
                <td class="num">${p ? pp.nbT : '—'}</td><td class="num">${c ? cc.nbT : '—'}</td><td class="num">${delta(cc.nbT - pp.nbT)}</td>
                <td class="num">${p ? fmt(pp.total) : '—'}</td><td class="num">${c ? fmt(cc.total) : '—'}</td><td class="num">${delta(cc.total - pp.total)}</td>
                <td class="num">${p ? fmt(pp.hsa) : '—'}</td><td class="num">${c ? fmt(cc.hsa) : '—'}</td><td class="num">${delta(cc.hsa - pp.hsa)}</td></tr>`;
        }).join('');
        const dot = (label, a, b) => `<tr><td>${label}</td><td class="num">${fmt(a)}</td><td class="num">${fmt(b)}</td><td class="num">${delta(b - a)}</td></tr>`;
        body = `
            <table class="cmp-table cmp-small"><thead><tr><th>Dotation</th><th class="num">N-1</th><th class="num">N</th><th class="num">Écart</th></tr></thead><tbody>
                ${dot('Total des heures ventilées (h)', tot.p.total, tot.c.total)}
                ${dot('Dotation HP (h)', parseFloat(prev.dotation.hp) || 0, parseFloat(dotationGlobal.hp) || 0)}
                ${dot('Dotation HSA (h)', parseFloat(prev.dotation.hsa) || 0, parseFloat(dotationGlobal.hsa) || 0)}
            </tbody></table>
            <table class="cmp-table"><thead>
                <tr><th rowspan="2">Discipline</th><th colspan="3" class="grp">Enseignants</th><th colspan="3" class="grp">Total (h)</th><th colspan="3" class="grp">HSA (h)</th></tr>
                <tr><th class="num">N-1</th><th class="num">N</th><th class="num">Écart</th><th class="num">N-1</th><th class="num">N</th><th class="num">Écart</th><th class="num">N-1</th><th class="num">N</th><th class="num">Écart</th></tr>
            </thead><tbody>${rows}
                <tr class="cmp-total"><td>Total</td>
                <td class="num">${tot.p.nbT}</td><td class="num">${tot.c.nbT}</td><td class="num">${delta(tot.c.nbT - tot.p.nbT)}</td>
                <td class="num">${fmt(tot.p.total)}</td><td class="num">${fmt(tot.c.total)}</td><td class="num">${delta(tot.c.total - tot.p.total)}</td>
                <td class="num">${fmt(tot.p.hsa)}</td><td class="num">${fmt(tot.c.hsa)}</td><td class="num">${delta(tot.c.hsa - tot.p.hsa)}</td></tr>
            </tbody></table>`;
    } else if (compareTab === 'svc') {
        const keys = Array.from(new Set(Object.keys(cur.services).concat(Object.keys(prev.services))));
        const lvlIdx = l => { const i = levels.indexOf(l.split(', ')[0]); return i === -1 ? 999 : i; };
        const items = keys.map(k => ({ p: prev.services[k], c: cur.services[k] }))
            .map(x => Object.assign(x, { ref: x.c || x.p }))
            .sort((a, b) => lvlIdx(a.ref.level) - lvlIdx(b.ref.level) || a.ref.name.localeCompare(b.ref.name, 'fr'));
        const shown = items.filter(x => !compareOnlyChanges || !x.p || !x.c || Math.abs(x.c.classes - x.p.classes) > 0.004 || Math.abs(x.c.volume - x.p.volume) > 0.004);
        const rows = shown.map(x => {
            const pc = x.p ? x.p.classes : 0, cc = x.c ? x.c.classes : 0, pv = x.p ? x.p.volume : 0, cv = x.c ? x.c.volume : 0;
            const tag = !x.p ? ' <span class="cmp-tag new">nouveau</span>' : (!x.c ? ' <span class="cmp-tag gone">supprimé</span>' : '');
            return `<tr><td>${esc(x.ref.level)}</td><td><strong>${esc(x.ref.name)}</strong>${tag}</td>
                <td class="num">${x.p ? fmt(pc) : '—'}</td><td class="num">${x.c ? fmt(cc) : '—'}</td><td class="num">${delta(cc - pc)}</td>
                <td class="num">${x.p ? fmt(pv) : '—'}</td><td class="num">${x.c ? fmt(cv) : '—'}</td><td class="num">${delta(cv - pv)}</td></tr>`;
        }).join('');
        body = `<label class="cmp-check"><input type="checkbox" ${compareOnlyChanges ? 'checked' : ''} onchange="toggleCompareOnlyChanges(this.checked)"> Masquer les services inchangés (${items.length - shown.length} masqué${items.length - shown.length > 1 ? 's' : ''})</label>
            ${rows ? `<table class="cmp-table"><thead>
                <tr><th rowspan="2">Niveau</th><th rowspan="2">Service</th><th colspan="3" class="grp">Nombre de classes</th><th colspan="3" class="grp">Volume (h)</th></tr>
                <tr><th class="num">N-1</th><th class="num">N</th><th class="num">Écart</th><th class="num">N-1</th><th class="num">N</th><th class="num">Écart</th></tr>
            </thead><tbody>${rows}</tbody></table>` : '<p class="empty-state">Aucune différence.</p>'}`;
    } else if (compareTab === 'export') {
        const o = compareExportOpts;
        const chk = (k, label) => `<label class="cmp-check" style="display:flex; margin:6px 0;"><input type="checkbox" ${o[k] ? 'checked' : ''} onchange="compareExportOpts.${k} = this.checked"> ${label}</label>`;
        body = `<p class="settings-tab-hint">Génère un PDF en paysage, dans le style de l'export pour la présentation, avec les rubriques choisies.</p>
            ${chk('disc', 'Dotation et disciplines')}
            ${chk('svc', 'Services par niveau')}
            <div style="margin-left:24px;">${chk('onlyChanges', 'Uniquement les services modifiés, nouveaux ou supprimés')}</div>
            ${chk('teach', 'Enseignants (arrivées, absents, HSA)')}
            <button class="btn-primary" type="button" onclick="exportComparePdf()" style="margin-top:12px;">📄 Exporter en PDF</button>`;
    } else {
        const names = Array.from(new Set(Object.keys(cur.teachers).concat(Object.keys(prev.teachers))));
        const status = n => !prev.teachers[n] ? 0 : (!cur.teachers[n] ? 1 : 2);
        names.sort((a, b) => status(a) - status(b) || a.localeCompare(b, 'fr'));
        const rows = names.map(n => {
            const p = prev.teachers[n], c = cur.teachers[n], st = status(n);
            const tag = st === 0 ? '<span class="cmp-tag new">Nouveau</span>' : (st === 1 ? '<span class="cmp-tag gone">Absent cette année</span>' : '<span class="cmp-tag">Présent</span>');
            const discs = Array.from(new Set((c ? c.discs : []).concat(p ? p.discs : [])));
            return `<tr><td><strong>${esc(n)}</strong></td><td>${tag}</td><td>${discs.map(esc).join(', ')}</td>
                <td class="num">${p ? fmt(p.total) : '—'}</td><td class="num">${c ? fmt(c.total) : '—'}</td>
                <td class="num">${p ? fmt(p.hsa) : '—'}</td><td class="num">${c ? fmt(c.hsa) : '—'}</td><td class="num">${delta((c ? c.hsa : 0) - (p ? p.hsa : 0))}</td></tr>`;
        }).join('');
        const nNew = names.filter(n => status(n) === 0).length, nGone = names.filter(n => status(n) === 1).length;
        body = `<p class="settings-tab-hint">${nNew} enseignant${nNew > 1 ? 's' : ''} nouveau${nNew > 1 ? 'x' : ''} · ${nGone} absent${nGone > 1 ? 's' : ''} par rapport à N-1. Les enseignants sont rapprochés par leur nom exact.</p>
            <table class="cmp-table"><thead>
                <tr><th rowspan="2">Enseignant</th><th rowspan="2">Situation</th><th rowspan="2">Discipline(s)</th><th colspan="2" class="grp">Total (h)</th><th colspan="3" class="grp">HSA (h)</th></tr>
                <tr><th class="num">N-1</th><th class="num">N</th><th class="num">N-1</th><th class="num">N</th><th class="num">Écart</th></tr>
            </thead><tbody>${rows}</tbody></table>`;
    }

    box.innerHTML = `
        <div class="cmp-head"><span>Fichier N-1 : <strong>${esc(compareData.file)}</strong>${compareData.name ? ' (' + esc(compareData.name) + ')' : ''}</span>${loader}</div>
        <div class="level-tabs-nav">${tabBtn('disc', 'Disciplines')}${tabBtn('svc', 'Services par niveau')}${tabBtn('teach', 'Enseignants')}${tabBtn('export', 'Exporter')}</div>
        ${body}`;
}


// ============================================================
// 📅 À partir de l'année N-1 : EPLE, options, niveaux et intitulés repris d'une sauvegarde précédente
// ============================================================
function n1ListId(level) {
    if (!n1Reference || !n1Reference.enabled) return '';
    const names = n1Reference.names || {};
    return Object.prototype.hasOwnProperty.call(names, level) ? 'n1List_' + Object.keys(names).indexOf(level) : 'n1List_all';
}

function n1ListAttr(level) {
    const id = n1ListId(level);
    return id ? `list="${id}"` : '';
}

// Une liste de suggestions par niveau (+ une liste « tous niveaux » pour un niveau absent du fichier N-1)
function refreshN1Datalists() {
    let box = document.getElementById('n1Datalists');
    if (!box) { box = document.createElement('div'); box.id = 'n1Datalists'; box.style.display = 'none'; document.body.appendChild(box); }
    if (!n1Reference || !n1Reference.enabled) { box.innerHTML = ''; return; }
    const esc = escapeStructureHtml;
    const names = n1Reference.names || {};
    const all = Array.from(new Set(Object.values(names).flat())).sort((a, b) => a.localeCompare(b, 'fr'));
    box.innerHTML = Object.keys(names).map((lvl, i) => `<datalist id="n1List_${i}">${names[lvl].map(n => `<option value="${esc(n)}"></option>`).join('')}</datalist>`).join('')
        + `<datalist id="n1List_all">${all.map(n => `<option value="${esc(n)}"></option>`).join('')}</datalist>`;
}

function openN1Modal() {
    renderN1Content();
    document.getElementById('n1Modal').classList.add('active');
}

function closeN1Modal() {
    document.getElementById('n1Modal').classList.remove('active');
}

function toggleN1Enabled(v) {
    n1Reference.enabled = !!v;
    refreshN1Datalists();
    renderApp();
    renderN1Content();
}

function renderN1Content() {
    const esc = escapeStructureHtml;
    const box = document.getElementById('n1Content');
    const on = !!n1Reference.enabled;
    const hasData = (n1Reference.levels || []).length > 0;
    const nbNames = Array.from(new Set(Object.values(n1Reference.names || {}).flat())).length;
    const flagLabels = { enableSpecialites: 'Spécialités', enableOptionnels: 'Enseignements optionnels', enableCoEnseignement: 'Co-enseignement', enableMultiNiveau: 'Multi-niveaux', enableMultiSite: 'Multi-site', enablePonderations: 'Pondérations' };
    const flags = Object.keys(flagLabels).filter(k => n1Reference.flags && n1Reference.flags[k]).map(k => flagLabels[k]);
    box.innerHTML = `
        <label class="n1-switch"><input type="checkbox" ${on ? 'checked' : ''} onchange="toggleN1Enabled(this.checked)"> <span>Je souhaite construire la ventilation à partir des données de l'année N-1</span></label>
        ${on ? `
        <p class="settings-tab-hint">Chargez la sauvegarde (.json) de l'année N-1. L'application reprend l'<strong>EPLE</strong>, les <strong>options activées</strong>, les <strong>niveaux</strong> et les <strong>intitulés des services / matières</strong>. Ensuite, quand vous saisissez un service, les intitulés de l'année N-1 vous sont proposés pour le niveau concerné.</p>
        <label class="btn-secondary cmp-load">📂 ${hasData ? 'Charger un autre fichier N-1' : 'Charger le fichier N-1 (.json)'}<input type="file" accept=".json" onchange="loadN1File(this)" style="display:none"></label>
        ${hasData ? `<div class="n1-summary">
            <div><strong>Fichier :</strong> ${esc(n1Reference.file)}</div>
            <div><strong>EPLE :</strong> ${esc(n1Reference.epleName || '—')}</div>
            <div><strong>Niveaux :</strong> ${n1Reference.levels.map(esc).join(', ')}</div>
            <div><strong>Options activées :</strong> ${flags.length ? flags.join(', ') : 'aucune'}</div>
            <div><strong>Intitulés proposés :</strong> ${nbNames}</div>
            <button class="btn-secondary" type="button" onclick="clearN1Data()" style="margin-top:8px;">🗑️ Retirer les données N-1</button>
        </div>` : ''}` : ''}`;
}

function loadN1File(input) {
    const file = input.files && input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        try {
            const obj = JSON.parse(e.target.result);
            if (!obj || typeof obj.dataStore !== 'object') throw new Error('format');
            const names = {};
            const lvls = Array.isArray(obj.levels) && obj.levels.length ? obj.levels.slice() : levels.slice();
            lvls.forEach(l => { names[l] = []; });
            Object.values(obj.dataStore).forEach(d => (d.services || []).forEach(sv => {
                const n = (sv.name || '').trim();
                if (!n) return;
                const lv = sv.isOptionnel && Array.isArray(sv.levels) && sv.levels.length ? sv.levels : [sv.level];
                lv.forEach(l => {
                    if (!names[l]) names[l] = [];
                    if (!names[l].some(x => x.toLowerCase() === n.toLowerCase())) names[l].push(n);
                });
            }));
            Object.keys(names).forEach(l => names[l].sort((a, b) => a.localeCompare(b, 'fr')));
            const id = obj.epleIdentity || {};
            const hasWork = Object.keys(dataStore).length > 0;
            if (hasWork && !confirm("Le nom de l'EPLE, les options activées et les niveaux du fichier N-1 vont remplacer ceux du projet actuel. Continuer ?")) { input.value = ''; return; }
            const flagKeys = ['enableSpecialites', 'enableOptionnels', 'enableCoEnseignement', 'enableMultiNiveau', 'enableMultiSite', 'enablePonderations'];
            const flags = {};
            flagKeys.forEach(k => { flags[k] = !!id[k]; });
            epleIdentity = Object.assign({}, epleIdentity, { name: id.name || '', uai: id.uai || '', commune: id.commune || '', sites: Array.isArray(id.sites) ? id.sites : [] }, flags);
            levels = lvls;
            n1Reference = { enabled: true, file: file.name, epleName: id.name || '', levels: lvls.slice(), names, flags };
            renderApp();
            renderN1Content();
        } catch (err) {
            alert("Ce fichier n'est pas une sauvegarde valide (.json enregistrée depuis l'application).");
        }
        input.value = '';
    };
    reader.readAsText(file);
}

function clearN1Data() {
    if (!confirm("Retirer les intitulés de l'année N-1 ? L'EPLE, les niveaux et les options déjà repris restent en place.")) return;
    n1Reference = { enabled: n1Reference.enabled, file: '', epleName: '', levels: [], names: {}, flags: {} };
    renderApp();
    renderN1Content();
}


// Export PDF paysage du suivi des spécialités (style du PDF de présentation) : un tableau par niveau
function exportSpecialitesPdf() {
    const esc = escapeStructureHtml;
    const fmt = n => String(Math.round(n * 100) / 100).replace('.', ',');
    const lvls = levels.filter(l => getSpecialiteRows(l).length > 0);
    if (lvls.length === 0) { alert('Aucune spécialité à exporter.'); return; }
    const dateStr = new Date().toLocaleDateString('fr-FR');
    const epleName = epleIdentity && epleIdentity.name ? epleIdentity.name : '';
    const PAGE_INNER_PX = Math.floor(188 * 96 / 25.4) - 52;
    const TITLE_RESERVE = 70;
    const head = '<tr><th style="width:24%">Spécialité</th><th class="num" style="width:12%">Nombre de groupes</th><th>Enseignants (heures)</th></tr>';

    const sections = lvls.map(lvl => {
        let totalGroups = 0;
        const rows = getSpecialiteRows(lvl).map(g => {
            totalGroups += g.groups;
            const people = g.teachers.slice().sort((a, b) => a.t.localeCompare(b.t, 'fr'));
            const tHtml = people.length
                ? `<div style="display:grid; grid-template-columns:1fr 1fr; gap:1mm 6mm;">${people.map(x => `<div>${esc(x.t)} (${fmt(x.h)} h)</div>`).join('')}</div>`
                : '<em>Aucun enseignant affecté</em>';
            return `<tr><td><strong>${esc(g.name)}</strong></td><td class="num">${fmt(g.groups)}</td><td>${tHtml}</td></tr>`;
        });
        rows.push(`<tr class="pres-total"><td>Total</td><td class="num">${fmt(totalGroups)}</td><td></td></tr>`);
        return { lvl, rows };
    });

    const measureBox = document.createElement('div');
    measureBox.className = 'pres-measure';
    document.body.appendChild(measureBox);
    measureBox.innerHTML = `<table class="pres-table"><thead>${head}</thead><tbody>${sections.map(sc => sc.rows.join('')).join('')}</tbody></table>`;
    const theadH = measureBox.querySelector('thead').offsetHeight;
    const allH = Array.from(measureBox.querySelectorAll('tbody tr')).map(tr => tr.offsetHeight);
    document.body.removeChild(measureBox);

    const avail = PAGE_INNER_PX - TITLE_RESERVE - theadH;
    const pages = [];
    let hi = 0;
    sections.forEach(sc => {
        let cur = [], used = 0;
        const chunks = [];
        sc.rows.forEach(r => {
            const h = allH[hi++];
            if (cur.length > 0 && used + h > avail) { chunks.push(cur); cur = []; used = 0; }
            cur.push(r); used += h;
        });
        if (cur.length) chunks.push(cur);
        chunks.forEach((rows, i) => pages.push({ lvl: sc.lvl, rows, part: i + 1, parts: chunks.length }));
    });

    const total = pages.length;
    const footerLabel = `${esc(epleName)}${epleName ? ' · ' : ''}Spécialités - ${dateStr}`;
    const container = document.getElementById('presentationPrint');
    container.innerHTML = pages.map((pg, i) => `
        <section class="pres-page">
            <h1 class="pres-title">Spécialités - ${esc(pg.lvl)}${pg.parts > 1 ? ` <small>(suite ${pg.part}/${pg.parts})</small>` : ''}</h1>
            <table class="pres-table"><thead>${head}</thead><tbody>${pg.rows.join('')}</tbody></table>
            <div class="pres-footer"><span>${footerLabel}</span><span>${i + 1}/${total}</span></div>
        </section>`).join('');

    document.body.classList.add('printing-presentation');
    const cleanup = () => {
        document.body.classList.remove('printing-presentation');
        container.innerHTML = '';
        window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    triggerPrint();
}


// ============================================================
// 🏫 Multi-site : répartition des classes d'un service entre les sites de l'EPLE
// ============================================================
const SITE_COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6', '#ef4444'];
function getSiteColor(st, i) {
    return (st && /^#[0-9a-fA-F]{6}$/.test(st.color || '')) ? st.color : SITE_COLORS[(i || 0) % SITE_COLORS.length];
}
function getSiteColorById(id) {
    const sites = epleIdentity.sites || [];
    const i = sites.findIndex(x => x.id === id);
    return i >= 0 ? getSiteColor(sites[i], i) : '#94a3b8';
}

// Bandeau vertical au début d'une ligne de service : couleur du site, ou hachures des couleurs de chaque site
function siteRowStyle(sv) {
    if (!multiSiteActive()) return '';
    const split = getServiceSiteSplit(sv);
    if (!split) return '';
    const cols = Object.keys(split).map(id => getSiteColorById(id));
    if (cols.length === 0) return '';
    const bg = cols.length === 1
        ? cols[0]
        : `repeating-linear-gradient(135deg, ${cols.map((c, i) => `${c} ${i * 5}px ${(i + 1) * 5}px`).join(', ')})`;
    return `background-image: ${cols.length === 1 ? `linear-gradient(${bg}, ${bg})` : bg}; background-size: 8px 100%; background-repeat: no-repeat; background-position: left top; padding-left: 14px;`;
}

function multiSiteActive() {
    return !!(epleIdentity && epleIdentity.enableMultiSite && Array.isArray(epleIdentity.sites) && epleIdentity.sites.length >= 2);
}

function getSiteLabel(id) {
    const st = (epleIdentity.sites || []).find(x => x.id === id);
    return st ? (st.short || st.name || id) : '';
}

// Répartition { idSite: nbClasses } d'un service (null si aucun site précisé)
function getServiceSiteSplit(sv) {
    if (!multiSiteActive()) return null;
    const valid = (epleIdentity.sites || []).map(x => x.id);
    const ids = (Array.isArray(sv.sites) ? sv.sites : []).filter(id => valid.includes(id));
    if (ids.length === 0) return null;
    const out = {};
    if (ids.length === 1) { out[ids[0]] = parseFloat(sv.classes) || 0; return out; }
    ids.forEach(id => { out[id] = parseFloat(sv.siteClasses && sv.siteClasses[id]) || 0; });
    return out;
}

function siteBoxHtml(service, isLocked, disc, sIndex) {
    if (!multiSiteActive()) return '';
    const esc = escapeStructureHtml;
    const ids = (Array.isArray(service.sites) ? service.sites : []);
    const classes = parseFloat(service.classes) || 0;
    const dattr = `data-disc="${esc(disc)}" data-sindex="${sIndex}"`;
    const chips = epleIdentity.sites.map((st, si) => `<button type="button" class="site-chip ${ids.includes(st.id) ? 'on' : ''}" style="${ids.includes(st.id) ? `background:${getSiteColor(st, si)}33; border-color:${getSiteColor(st, si)}; color:#1e293b;` : `border-left: 4px solid ${getSiteColor(st, si)};`}" title="${esc(st.name)}" ${isLocked ? 'disabled' : ''} onclick="toggleServiceSite(this, '${st.id}')">${esc(st.short || st.name)}</button>`).join('');
    let inputs = '';
    if (ids.length >= 2) {
        const split = getServiceSiteSplit(service) || {};
        const sum = Object.values(split).reduce((a, b) => a + b, 0);
        const ok = Math.abs(sum - classes) < 0.004;
        inputs = `<div class="site-inputs">${ids.filter(id => split[id] !== undefined).map(id => `<label>${esc(getSiteLabel(id))}<input type="number" min="0" step="0.5" value="${split[id]}" ${isLocked ? 'disabled' : ''} onchange="setServiceSiteClasses(this, '${id}', parseFloat(this.value)||0)"></label>`).join('')}
            <span class="site-sum ${ok ? 'ok' : 'ko'}" title="La somme des classes par site doit égaler le nombre de classes">${ok ? '✓' : `Σ ${String(Math.round(sum * 100) / 100).replace('.', ',')} / ${String(Math.round(classes * 100) / 100).replace('.', ',')}`}</span></div>`;
    }
    return `<div class="site-box" ${dattr}><div class="site-chips">${chips}</div>${inputs}</div>`;
}

function siteBoxContext(el) {
    const box = el.closest('.site-box');
    if (!box) return null;
    const disc = box.getAttribute('data-disc'), sIndex = parseInt(box.getAttribute('data-sindex'), 10);
    const service = dataStore[disc] && dataStore[disc].services[sIndex];
    return service ? { box, disc, sIndex, service } : null;
}

function rerenderSiteBox(ctx) {
    const tmp = document.createElement('div');
    tmp.innerHTML = siteBoxHtml(ctx.service, !!ctx.service.locked, ctx.disc, ctx.sIndex);
    const nb = tmp.firstElementChild;
    if (nb) ctx.box.replaceWith(nb); else ctx.box.remove();
}

function toggleServiceSite(btn, siteId) {
    const ctx = siteBoxContext(btn);
    if (!ctx) return;
    const sv = ctx.service;
    if (!Array.isArray(sv.sites)) sv.sites = [];
    if (!sv.siteClasses) sv.siteClasses = {};
    const k = sv.sites.indexOf(siteId);
    if (k >= 0) { sv.sites.splice(k, 1); delete sv.siteClasses[siteId]; }
    else { sv.sites.push(siteId); sv.siteClasses[siteId] = 0; }
    if (sv.sites.length === 1) sv.siteClasses = { [sv.sites[0]]: parseFloat(sv.classes) || 0 };
    rerenderSiteBox(ctx);
}

function setServiceSiteClasses(input, siteId, value) {
    const ctx = siteBoxContext(input);
    if (!ctx) return;
    if (!ctx.service.siteClasses) ctx.service.siteClasses = {};
    ctx.service.siteClasses[siteId] = value;
    updateSiteSum(ctx);   // mise à jour sur place : on ne reconstruit pas les champs pour ne pas perdre le focus
}

function updateSiteSum(ctx) {
    const el = ctx.box.querySelector('.site-sum');
    if (!el) return;
    const split = getServiceSiteSplit(ctx.service) || {};
    const sum = Object.values(split).reduce((a, b) => a + b, 0);
    const classes = parseFloat(ctx.service.classes) || 0;
    const ok = Math.abs(sum - classes) < 0.004;
    const f = n => String(Math.round(n * 100) / 100).replace('.', ',');
    el.className = 'site-sum ' + (ok ? 'ok' : 'ko');
    el.textContent = ok ? '✓' : `Σ ${f(sum)} / ${f(classes)}`;
}

// Quand le nombre de classes change : un seul site => il porte toutes les classes
function syncServiceSitesWithClasses(service) {
    if (!multiSiteActive() || !Array.isArray(service.sites) || service.sites.length !== 1) return;
    service.siteClasses = { [service.sites[0]]: parseFloat(service.classes) || 0 };
}


// Détail par site sous le total de classes (Ventilation / Niveau)
function siteSplitHtml(g, fmtN) {
    if (!multiSiteActive() || !g.siteAny) return '';
    const esc = escapeStructureHtml;
    const parts = (epleIdentity.sites || []).filter(st => g.siteSum[st.id] > 0).map(st => `${esc(st.short || st.name)} : ${fmtN(g.siteSum[st.id])}`);
    const assigned = Object.values(g.siteSum).reduce((a, b) => a + b, 0);
    const rest = g.classes - assigned;
    if (rest > 0.004) parts.push(`non précisé : ${fmtN(rest)}`);
    return parts.length ? `<div class="site-split">${parts.join(' · ')}</div>` : '';
}


// Fenêtre « Gestion des sites » : un onglet par discipline, répartition des classes de chaque service entre les sites
let siteTabIndex = 0;

function openSiteModal() {
    renderSiteModal();
    document.getElementById('siteModal').classList.add('active');
}

function closeSiteModal() {
    document.getElementById('siteModal').classList.remove('active');
    renderApp();
}

function switchSiteTab(i) { siteTabIndex = i; renderSiteModal(); }

function renderSiteModal() {
    const esc = escapeStructureHtml;
    const discs = Object.keys(dataStore);
    const tabs = document.getElementById('siteTabsContainer');
    const content = document.getElementById('siteContentsContainer');
    if (discs.length === 0) { tabs.innerHTML = ''; content.innerHTML = '<p class="empty-state">Aucune discipline.</p>'; return; }
    if (siteTabIndex >= discs.length) siteTabIndex = 0;
    tabs.innerHTML = discs.map((d, i) => `<button class="level-tab-btn ${i === siteTabIndex ? 'active' : ''}" onclick="switchSiteTab(${i})">${esc(d)}</button>`).join('');
    const disc = discs[siteTabIndex];
    const fmt = n => String(Math.round(n * 100) / 100).replace('.', ',');
    const rows = (dataStore[disc].services || []).map((sv, i) => `<tr>
        <td style="${siteRowStyle(sv)}">${esc(sv.level || '')}</td>
        <td><div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;"><strong>${esc((sv.name || '').trim() || '(sans intitulé)')}</strong>${sv.isSpecialite ? buildSpeBadgeHtml() : ''}${sv.isOptionnel ? buildOptBadgeHtml() : ''}${sv.isCoEnseignement ? buildCoEnsBadgeHtml() : ''}${(Array.isArray(sv.levels) && sv.levels.length > 1) ? buildLinkedLevelsBadgeHtml(sv.levels.filter(l => l !== sv.level)) : ''}</div></td>
        <td class="num">${fmt(parseFloat(sv.classes) || 0)}</td>
        <td>${siteBoxHtml(sv, !!sv.locked, disc, i)}</td></tr>`).join('');
    content.innerHTML = rows
        ? `<p class="settings-tab-hint">Cliquez sur le ou les sites concernés par chaque service ; avec plusieurs sites, indiquez le nombre de classes de chacun (leur somme doit égaler le nombre de classes). Ces informations alimentent « Ventilation / Niveau ».</p>
           <table class="are-list-table site-table"><thead><tr><th>Niveau</th><th>Intitulé du service</th><th class="num">Nbr. classe</th><th>Sites</th></tr></thead><tbody>${rows}</tbody></table>`
        : '<p class="empty-state">Aucun service dans cette discipline.</p>';
}


// ------------------------------------------------------------
// Synthèse par site : un onglet par site, services (niveau, intitulé, classes, discipline)
// ------------------------------------------------------------
let siteSynthTab = 0;
let siteSynthLevel = '';

function openSiteSynthesisModal() {
    siteSynthTab = 0;
    siteSynthLevel = '';
    renderSiteSynthesis();
    document.getElementById('siteSynthesisModal').classList.add('active');
}

function closeSiteSynthesisModal() {
    document.getElementById('siteSynthesisModal').classList.remove('active');
}

function switchSiteSynthTab(i) { siteSynthTab = i; siteSynthLevel = ''; renderSiteSynthesis(); }
function switchSiteSynthLevel(l) { siteSynthLevel = l; renderSiteSynthesis(); }

function renderSiteSynthesis() {
    const esc = escapeStructureHtml;
    const fmt = n => String(Math.round(n * 100) / 100).replace('.', ',');
    const tabs = document.getElementById('siteSynthTabs');
    const lvlTabs = document.getElementById('siteSynthLevels');
    const box = document.getElementById('siteSynthContent');
    const sites = (epleIdentity.sites || []);
    if (!multiSiteActive()) { tabs.innerHTML = ''; lvlTabs.innerHTML = ''; box.innerHTML = '<p class="empty-state">La gestion multi-site n\'est pas activée.</p>'; return; }
    if (siteSynthTab >= sites.length) siteSynthTab = 0;
    tabs.innerHTML = sites.map((st, i) => `<button class="level-tab-btn ${i === siteSynthTab ? 'active' : ''}" title="${esc(st.name)}" onclick="switchSiteSynthTab(${i})"><span class="site-dot" style="background:${getSiteColor(st, i)}"></span>${esc(st.name || st.short)}</button>`).join('');
    const site = sites[siteSynthTab];

    // lignes du site, par niveau
    const byLevel = {};
    let unassigned = 0;
    Object.keys(dataStore).forEach(disc => (dataStore[disc].services || []).forEach(sv => {
        const split = getServiceSiteSplit(sv);
        if (!split) { if ((parseFloat(sv.classes) || 0) > 0) unassigned++; return; }
        const n = split[site.id] || 0;
        if (n <= 0) return;
        const lvList = sv.isOptionnel && Array.isArray(sv.levels) && sv.levels.length ? sv.levels : [sv.level || ''];
        lvList.forEach(l => {
            if (!byLevel[l]) byLevel[l] = [];
            const totalCl = parseFloat(sv.classes) || 0;
            let alloc = 0;
            Object.values(sv.allocations || {}).forEach(v => { alloc += parseFloat(v) || 0; });
            const hrs = totalCl > 0 ? alloc * n / totalCl : 0;     // heures ventilées, au prorata des classes du site
            byLevel[l].push({ name: (sv.name || '').trim() || '(sans intitulé)', classes: n, disc, hours: hrs,
                spe: !!sv.isSpecialite, opt: !!sv.isOptionnel, coE: !!sv.isCoEnseignement,
                others: (Array.isArray(sv.levels) && sv.levels.length > 1) ? sv.levels.filter(x => x !== l) : [] });
        });
    }));
    const lvlIdx = l => { const i = levels.indexOf(l); return i === -1 ? 999 : i; };
    const lvlList = Object.keys(byLevel).sort((a, b) => lvlIdx(a) - lvlIdx(b));
    const note = unassigned ? `<p class="settings-tab-hint">${unassigned} service${unassigned > 1 ? 's' : ''} sans site précisé (à renseigner dans Édition › Gestion des sites).</p>` : '';
    if (lvlList.length === 0) {
        lvlTabs.innerHTML = '';
        box.innerHTML = `<p class="empty-state">Aucun service n'est attribué au site <strong>${esc(site.name || site.short)}</strong>.</p>${note}`;
        return;
    }
    if (!lvlList.includes(siteSynthLevel)) siteSynthLevel = lvlList[0];
    lvlTabs.innerHTML = lvlList.map(l => `<button class="level-tab-btn ${l === siteSynthLevel ? 'active' : ''}" onclick="switchSiteSynthLevel(this.dataset.l)" data-l="${esc(l)}">${esc(l)}</button>`).join('');
    // fusion des intitulés identiques : classes additionnées, disciplines listées avec leurs heures ventilées
    const merged = {};
    byLevel[siteSynthLevel].forEach(r => {
        const k = r.name.toLowerCase();
        if (!merged[k]) merged[k] = { name: r.name, classes: 0, discs: {}, spe: false, opt: false, coE: false, others: [] };
        merged[k].classes += r.classes;
        merged[k].spe = merged[k].spe || r.spe; merged[k].opt = merged[k].opt || r.opt; merged[k].coE = merged[k].coE || r.coE;
        r.others.forEach(o => { if (!merged[k].others.includes(o)) merged[k].others.push(o); });
        merged[k].discs[r.disc] = (merged[k].discs[r.disc] || 0) + r.hours;
    });
    const rows = Object.values(merged).sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    box.innerHTML = `<table class="are-list-table site-table site-synth-table"><thead><tr><th>Intitulé du service</th><th class="num">Nbr. classe</th><th>Discipline(s)</th></tr></thead>
        <tbody>${rows.map(r => `<tr><td><div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;"><strong>${esc(r.name)}</strong>${r.spe ? buildSpeBadgeHtml() : ''}${r.opt ? buildOptBadgeHtml() : ''}${r.coE ? buildCoEnsBadgeHtml() : ''}${r.others.length ? buildLinkedLevelsBadgeHtml(r.others) : ''}</div></td><td class="num">${fmt(r.classes)}</td><td>${Object.keys(r.discs).sort((x, y) => x.localeCompare(y, 'fr')).map(d => `<div>${esc(d)} (${fmt(r.discs[d])} h)</div>`).join('')}</td></tr>`).join('')}</tbody></table>${note}`;
}


// Export PDF paysage de la comparaison N-1 (style du PDF de présentation)
function exportComparePdf() {
    if (!compareData) { alert("Chargez d'abord le fichier N-1."); return; }
    const o = compareExportOpts;
    if (!o.disc && !o.svc && !o.teach) { alert('Cochez au moins une rubrique.'); return; }
    const esc = escapeStructureHtml;
    const fmt = n => String(Math.round(n * 100) / 100).replace('.', ',');
    const delta = n => {
        const r = Math.round(n * 100) / 100;
        if (Math.abs(r) < 0.005) return '<span class="cmp-delta zero">=</span>';
        return `<span class="cmp-delta ${r > 0 ? 'up' : 'down'}">${r > 0 ? '+' : ''}${fmt(r)}</span>`;
    };
    const cur = computeDatasetMetrics(dataStore, epleIdentity, dotationGlobal);
    const prev = compareData.metrics;
    const dateStr = new Date().toLocaleDateString('fr-FR');
    const epleName = epleIdentity && epleIdentity.name ? epleIdentity.name : '';
    const PAGE_INNER_PX = Math.floor(188 * 96 / 25.4) - 52;
    const TITLE_RESERVE = 70;
    const sections = [];   // { title, head, rows[], extra? }

    if (o.disc) {
        const names = Array.from(new Set(Object.keys(cur.disc).concat(Object.keys(prev.disc))));
        const z = { nbT: 0, total: 0, hsa: 0 };
        const tp = { nbT: 0, total: 0, hsa: 0 }, tc = { nbT: 0, total: 0, hsa: 0 };
        const rows = names.map(n => {
            const p = prev.disc[n], c = cur.disc[n], pp = p || z, cc = c || z;
            ['nbT', 'total', 'hsa'].forEach(k => { tp[k] += pp[k]; tc[k] += cc[k]; });
            const tag = !p ? ' (nouvelle)' : (!c ? ' (absente)' : '');
            return `<tr><td><strong>${esc(n)}</strong>${tag}</td><td class="num">${p ? pp.nbT : '—'}</td><td class="num">${c ? cc.nbT : '—'}</td><td class="num">${delta(cc.nbT - pp.nbT)}</td>
                <td class="num">${p ? fmt(pp.total) : '—'}</td><td class="num">${c ? fmt(cc.total) : '—'}</td><td class="num">${delta(cc.total - pp.total)}</td>
                <td class="num">${p ? fmt(pp.hsa) : '—'}</td><td class="num">${c ? fmt(cc.hsa) : '—'}</td><td class="num">${delta(cc.hsa - pp.hsa)}</td></tr>`;
        });
        rows.push(`<tr class="pres-total"><td>Total</td><td class="num">${tp.nbT}</td><td class="num">${tc.nbT}</td><td class="num">${delta(tc.nbT - tp.nbT)}</td>
            <td class="num">${fmt(tp.total)}</td><td class="num">${fmt(tc.total)}</td><td class="num">${delta(tc.total - tp.total)}</td>
            <td class="num">${fmt(tp.hsa)}</td><td class="num">${fmt(tc.hsa)}</td><td class="num">${delta(tc.hsa - tp.hsa)}</td></tr>`);
        const dp = parseFloat(prev.dotation.hp) || 0, dc = parseFloat(dotationGlobal.hp) || 0;
        const sp = parseFloat(prev.dotation.hsa) || 0, sc = parseFloat(dotationGlobal.hsa) || 0;
        sections.push({
            title: 'Disciplines',
            head: '<tr><th>Discipline</th><th class="num">Ens. N-1</th><th class="num">Ens. N</th><th class="num">Écart</th><th class="num">Total N-1</th><th class="num">Total N</th><th class="num">Écart</th><th class="num">HSA N-1</th><th class="num">HSA N</th><th class="num">Écart</th></tr>',
            rows,
            intro: `<table class="pres-table" style="width:auto; margin-bottom:5mm;"><thead><tr><th>Dotation</th><th class="num">N-1</th><th class="num">N</th><th class="num">Écart</th></tr></thead><tbody>
                <tr><td>Total des heures ventilées (h)</td><td class="num">${fmt(tp.total)}</td><td class="num">${fmt(tc.total)}</td><td class="num">${delta(tc.total - tp.total)}</td></tr>
                <tr><td>Dotation HP (h)</td><td class="num">${fmt(dp)}</td><td class="num">${fmt(dc)}</td><td class="num">${delta(dc - dp)}</td></tr>
                <tr><td>Dotation HSA (h)</td><td class="num">${fmt(sp)}</td><td class="num">${fmt(sc)}</td><td class="num">${delta(sc - sp)}</td></tr></tbody></table>`
        });
    }

    if (o.svc) {
        const keys = Array.from(new Set(Object.keys(cur.services).concat(Object.keys(prev.services))));
        const lvlIdx = l => { const i = levels.indexOf(l.split(', ')[0]); return i === -1 ? 999 : i; };
        const items = keys.map(k => ({ p: prev.services[k], c: cur.services[k] })).map(x => Object.assign(x, { ref: x.c || x.p }))
            .sort((a, b) => lvlIdx(a.ref.level) - lvlIdx(b.ref.level) || a.ref.name.localeCompare(b.ref.name, 'fr'))
            .filter(x => !o.onlyChanges || !x.p || !x.c || Math.abs(x.c.classes - x.p.classes) > 0.004 || Math.abs(x.c.volume - x.p.volume) > 0.004);
        sections.push({
            title: 'Services par niveau' + (o.onlyChanges ? ' (modifications)' : ''),
            head: '<tr><th>Niveau</th><th>Service</th><th class="num">Classes N-1</th><th class="num">Classes N</th><th class="num">Écart</th><th class="num">Volume N-1</th><th class="num">Volume N</th><th class="num">Écart</th></tr>',
            rows: items.map(x => {
                const pc = x.p ? x.p.classes : 0, cc = x.c ? x.c.classes : 0, pv = x.p ? x.p.volume : 0, cv = x.c ? x.c.volume : 0;
                const tag = !x.p ? ' (nouveau)' : (!x.c ? ' (supprimé)' : '');
                return `<tr><td>${esc(x.ref.level)}</td><td><strong>${esc(x.ref.name)}</strong>${tag}</td><td class="num">${x.p ? fmt(pc) : '—'}</td><td class="num">${x.c ? fmt(cc) : '—'}</td><td class="num">${delta(cc - pc)}</td><td class="num">${x.p ? fmt(pv) : '—'}</td><td class="num">${x.c ? fmt(cv) : '—'}</td><td class="num">${delta(cv - pv)}</td></tr>`;
            }),
            empty: 'Aucune différence.'
        });
    }

    if (o.teach) {
        const names = Array.from(new Set(Object.keys(cur.teachers).concat(Object.keys(prev.teachers))));
        const status = n => !prev.teachers[n] ? 0 : (!cur.teachers[n] ? 1 : 2);
        names.sort((a, b) => status(a) - status(b) || a.localeCompare(b, 'fr'));
        sections.push({
            title: 'Enseignants',
            head: '<tr><th>Enseignant</th><th>Situation</th><th>Discipline(s)</th><th class="num">Total N-1</th><th class="num">Total N</th><th class="num">HSA N-1</th><th class="num">HSA N</th><th class="num">Écart</th></tr>',
            rows: names.map(n => {
                const p = prev.teachers[n], c = cur.teachers[n], st = status(n);
                const discs = Array.from(new Set((c ? c.discs : []).concat(p ? p.discs : [])));
                return `<tr><td><strong>${esc(n)}</strong></td><td>${st === 0 ? 'Nouveau' : (st === 1 ? 'Absent cette année' : 'Présent')}</td><td>${discs.map(esc).join(', ')}</td>
                    <td class="num">${p ? fmt(p.total) : '—'}</td><td class="num">${c ? fmt(c.total) : '—'}</td><td class="num">${p ? fmt(p.hsa) : '—'}</td><td class="num">${c ? fmt(c.hsa) : '—'}</td><td class="num">${delta((c ? c.hsa : 0) - (p ? p.hsa : 0))}</td></tr>`;
            })
        });
    }

    // pagination (mesure hors écran)
    const pages = [];
    sections.forEach(sec => {
        if (sec.rows.length === 0) { pages.push({ title: sec.title, head: sec.head, rows: [], empty: sec.empty || '', part: 1, parts: 1, intro: sec.intro }); return; }
        const mb = document.createElement('div');
        mb.className = 'pres-measure';
        document.body.appendChild(mb);
        mb.innerHTML = `${sec.intro || ''}<table class="pres-table"><thead>${sec.head}</thead><tbody>${sec.rows.join('')}</tbody></table>`;
        const introH = sec.intro ? mb.querySelector('table').offsetHeight + 20 : 0;
        const tables = mb.querySelectorAll('table');
        const mainT = tables[tables.length - 1];
        const theadH = mainT.querySelector('thead').offsetHeight;
        const hs = Array.from(mainT.querySelectorAll('tbody tr')).map(tr => tr.offsetHeight);
        document.body.removeChild(mb);
        const chunks = [];
        let cur2 = [], used = 0, avail = PAGE_INNER_PX - TITLE_RESERVE - theadH - introH;
        sec.rows.forEach((r, i) => {
            if (cur2.length > 0 && used + hs[i] > avail) { chunks.push(cur2); cur2 = []; used = 0; avail = PAGE_INNER_PX - TITLE_RESERVE - theadH; }
            cur2.push(r); used += hs[i];
        });
        if (cur2.length) chunks.push(cur2);
        chunks.forEach((rows, i) => pages.push({ title: sec.title, head: sec.head, rows, part: i + 1, parts: chunks.length, intro: i === 0 ? sec.intro : '' }));
    });

    const total = pages.length;
    const footerLabel = `${esc(epleName)}${epleName ? ' · ' : ''}Comparaison N-1 - ${dateStr}`;
    const sub = `Fichier N-1 : ${esc(compareData.file)}${compareData.name ? ' (' + esc(compareData.name) + ')' : ''}`;
    const container = document.getElementById('presentationPrint');
    container.innerHTML = pages.map((pg, i) => `
        <section class="pres-page">
            <h1 class="pres-title">Comparaison N-1 - ${esc(pg.title)}${pg.parts > 1 ? ` <small>(suite ${pg.part}/${pg.parts})</small>` : ''}</h1>
            <p style="margin: 0 0 4mm; font-size: 9pt; color: #555;">${sub}</p>
            ${pg.intro || ''}
            ${pg.rows.length ? `<table class="pres-table"><thead>${pg.head}</thead><tbody>${pg.rows.join('')}</tbody></table>` : `<p>${pg.empty || 'Aucune donnée.'}</p>`}
            <div class="pres-footer"><span>${footerLabel}</span><span>${i + 1}/${total}</span></div>
        </section>`).join('');

    document.body.classList.add('printing-presentation');
    const cleanup = () => {
        document.body.classList.remove('printing-presentation');
        container.innerHTML = '';
        window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    triggerPrint();
}


// Fichier › Exporter › Exporter la comparaison N-1 : ouvre la comparaison sur l'onglet d'export
// (si le fichier N-1 n'est pas encore chargé, il est demandé d'abord)
function openCompareExport() {
    compareTab = 'export';
    openCompareModal();
}


// ============================================================
// 🚦 Tableau des alertes : contrôles de cohérence de la ventilation
// ============================================================
let alertFilter = 'all';        // all | err | warn | info
let alertHsaThreshold = 2;      // seuil d'HSA par enseignant au-delà duquel une alerte est levée

function computeAlerts() {
    const out = [];
    const fmt = n => String(Math.round(n * 100) / 100).replace('.', ',');
    const add = (sev, disc, obj, msg) => out.push({ sev, disc, obj, msg });
    const discs = Object.keys(dataStore);
    let grandTotal = 0;
    const coordAll = Array.isArray(coordinators) ? coordinators : [];
    const coordByDisc = {};
    coordAll.forEach(e => (e.coords || (e.teacher ? [{ teacher: e.teacher }] : [])).forEach(c => { if (c.teacher) (e.discs || []).forEach(d => { coordByDisc[d] = true; }); }));

    discs.forEach(disc => {
        const d = dataStore[disc];
        const services = d.services || [];
        const teachers = d.teachers || [];
        if (!d.apports) d.apports = {};
        if (teachers.length === 0 && services.some(sv => (parseFloat(sv.classes) || 0) * (parseFloat(sv.hours) || 0) > 0)) {
            add('err', disc, 'Discipline', "Aucun enseignant dans cette discipline alors que des services existent.");
        }
        services.forEach(sv => {
            const label = (sv.name || '').trim();
            const level = sv.level || '';
            const target = (parseFloat(sv.classes) || 0) * (parseFloat(sv.hours) || 0);
            if (!label) add('warn', disc, `Service (${level || 'sans niveau'})`, "Intitulé du service non renseigné.");
            if (sv.isCoEnseignement) return;
            let done = 0;
            Object.values(sv.allocations || {}).forEach(v => { done += parseFloat(v) || 0; });
            const diff = Math.round((target - done) * 100) / 100;
            const obj = `${label || '(sans intitulé)'}${level ? ' (' + level + ')' : ''}`;
            if (target > 0 && done === 0) add('err', disc, obj, `Aucune heure ventilée : ${fmt(target)} h à attribuer.`);
            else if (diff > 0.004) add('err', disc, obj, `Il reste ${fmt(diff)} h à ventiler (${fmt(done)} h attribuées sur ${fmt(target)} h).`);
            else if (diff < -0.004) add('err', disc, obj, `Sur-ventilé de ${fmt(-diff)} h (${fmt(done)} h attribuées pour ${fmt(target)} h).`);
            if (multiSiteActive()) {
                const split = getServiceSiteSplit(sv);
                if (!split) {
                    if ((parseFloat(sv.classes) || 0) > 0) add('info', disc, obj, "Aucun site précisé (Édition › Gestion des sites).");
                } else {
                    const sum = Object.values(split).reduce((a, b) => a + b, 0);
                    if (Math.abs(sum - (parseFloat(sv.classes) || 0)) > 0.004) add('err', disc, obj, `La somme des classes par site (${fmt(sum)}) diffère du nombre de classes (${fmt(parseFloat(sv.classes) || 0)}).`);
                }
            }
        });
        teachers.forEach(t => {
            const sm = computeTeacherSummary(disc, t);
            grandTotal += sm.total;
            if (sm.total < 0.004) add('warn', disc, t, "Aucune heure attribuée à cet enseignant.");
            else if (sm.hsa < -0.004) add('warn', disc, t, `Sous son ORS : ${fmt(sm.total)} h pour ${fmt(sm.apport)} h d'ORS (${fmt(sm.hsa)} h).`);
            else if (sm.hsa > alertHsaThreshold + 0.004) add('warn', disc, t, `HSA élevées : +${fmt(sm.hsa)} h (seuil ${fmt(alertHsaThreshold)} h).`);
        });
        if (teachers.length > 0 && coordAll.length > 0 && !coordByDisc[disc]) add('info', disc, 'Discipline', "Aucun coordonnateur désigné.");
    });

    const dhg = (parseFloat(dotationGlobal.hp) || 0) + (parseFloat(dotationGlobal.hsa) || 0);
    if (dhg > 0) {
        const norv = dhg - grandTotal;
        if (norv < -0.004) add('err', 'EPLE', 'Dotation', `Dépassement de la dotation : ${fmt(grandTotal)} h ventilées pour ${fmt(dhg)} h (Norvégien ${fmt(norv)} h).`);
    }
    return out;
}

function openAlertsModal() {
    renderAlertsContent();
    document.getElementById('alertsModal').classList.add('active');
}

function closeAlertsModal() {
    document.getElementById('alertsModal').classList.remove('active');
}

function setAlertFilter(f) { alertFilter = f; renderAlertsContent(); }
function setAlertThreshold(v) { alertHsaThreshold = Math.max(0, parseFloat(v) || 0); renderAlertsContent(); }

function gotoAlertDiscipline(disc) {
    const i = Object.keys(dataStore).indexOf(disc);
    if (i < 0) return;
    currentActiveTabIndex = i;
    closeAlertsModal();
    renderApp();
}

function renderAlertsContent() {
    const esc = escapeStructureHtml;
    const box = document.getElementById('alertsContent');
    const all = computeAlerts();
    const count = sev => all.filter(a => a.sev === sev).length;
    const meta = { err: ['🔴', 'Erreur'], warn: ['🟠', 'À vérifier'], info: ['🔵', 'Information'] };
    const shown = all.filter(a => alertFilter === 'all' || a.sev === alertFilter);
    const chip = (f, label, n) => `<button class="level-tab-btn ${alertFilter === f ? 'active' : ''}" onclick="setAlertFilter('${f}')">${label} <strong>(${n})</strong></button>`;
    const discs = Object.keys(dataStore);
    const rows = shown.map(a => `<tr class="alert-${a.sev}">
        <td class="alert-sev" title="${meta[a.sev][1]}">${meta[a.sev][0]}</td>
        <td>${esc(a.disc)}</td><td><strong>${esc(a.obj)}</strong></td><td>${esc(a.msg)}</td>
        <td>${discs.includes(a.disc) ? `<button class="btn-secondary" style="padding:2px 8px; font-size:0.75rem;" data-d="${esc(a.disc)}" onclick="gotoAlertDiscipline(this.dataset.d)">Voir</button>` : ''}</td></tr>`).join('');
    box.innerHTML = `
        <div class="alert-head">
            <div class="level-tabs-nav">${chip('all', 'Toutes', all.length)}${chip('err', '🔴 Erreurs', count('err'))}${chip('warn', '🟠 À vérifier', count('warn'))}${chip('info', '🔵 Informations', count('info'))}</div>
            <label class="alert-threshold">Seuil d'HSA par enseignant (h)
                <input type="number" min="0" step="0.5" value="${alertHsaThreshold}" onchange="setAlertThreshold(this.value)"></label>
        </div>
        ${all.length === 0
            ? '<p class="empty-state">✅ Aucune alerte : la ventilation est cohérente.</p>'
            : (rows ? `<table class="are-list-table alert-table"><thead><tr><th></th><th>Discipline</th><th>Objet</th><th>Alerte</th><th></th></tr></thead><tbody>${rows}</tbody></table>` : '<p class="empty-state">Aucune alerte de ce type.</p>')}`;
}


// 👁 Services d'un enseignant : uniquement ceux où il a des heures (> 0)
function openTeacherServicesModal(disc, tIndex) {
    const data = dataStore[disc];
    const t = data && data.teachers[tIndex];
    if (!t) return;
    const esc = escapeStructureHtml;
    const fmt = n => String(Math.round(n * 100) / 100).replace('.', ',');
    const sm = computeTeacherSummary(disc, t);
    document.getElementById('teacherServicesTitle').textContent = `👁 Services de ${t} - ${disc}`;
    const body = sm.rows.length
        ? `<table class="are-list-table"><thead><tr><th>Niveau</th><th>Service</th><th class="num">Heures</th></tr></thead>
            <tbody>${sm.rows.map(r => `<tr><td style="white-space:nowrap;">${esc(r.level)}</td><td style="white-space:nowrap;"><strong>${esc((r.name || '').trim() || '(sans intitulé)')}</strong></td><td class="num">${fmt(r.hours)} h</td></tr>`).join('')}</tbody>
            <tfoot><tr class="are-list-total"><td colspan="2" style="text-align:right;">Total ventilé</td><td class="num">${fmt(sm.raw)} h</td></tr></tfoot></table>
           <p class="settings-tab-hint" style="margin-top:10px;">Total ${esc(totalLabelSuffix())} : <strong>${fmt(sm.total)} h</strong> · ORS : <strong>${fmt(sm.apport)} h</strong> · HSA : <strong>${sm.hsa > 0 ? '+' : ''}${fmt(sm.hsa)} h</strong></p>`
        : '<p class="empty-state">Aucun service avec des heures pour cet enseignant.</p>';
    document.getElementById('teacherServicesContent').innerHTML = body;
    document.getElementById('teacherServicesModal').classList.add('active');
}

function closeTeacherServicesModal() {
    document.getElementById('teacherServicesModal').classList.remove('active');
}


/* ===== Post-it par discipline ===== */
let postitDisc = null;
function openPostitModal(disc) {
    if (!dataStore[disc]) return;
    postitDisc = disc;
    document.getElementById('postitTitle').textContent = disc;
    const ta = document.getElementById('postitText');
    ta.value = dataStore[disc].note || '';
    document.getElementById('postitModal').classList.add('active');
    setTimeout(() => ta.focus(), 30);
}
function savePostitNote() {
    if (!postitDisc || !dataStore[postitDisc]) return;
    const v = document.getElementById('postitText').value;
    if (v.trim()) dataStore[postitDisc].note = v; else delete dataStore[postitDisc].note;
    document.querySelectorAll('.postit-btn').forEach(b => {
        if (b.dataset.disc === postitDisc) b.classList.toggle('has-note', !!v.trim());
    });
}
function closePostitModal() {
    savePostitNote();
    document.getElementById('postitModal').classList.remove('active');
    const d = postitDisc;
    postitDisc = null;
    if (typeof renderApp === 'function') { try { renderApp(); } catch (e) {} }
}
