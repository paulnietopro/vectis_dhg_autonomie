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
    enableMultiNiveau: false
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
        "enableCoEnseignement": true
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
    initFeedbackModal();

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

function toggleMultiNiveauGlobal(enabled) {
    epleIdentity.enableMultiNiveau = enabled;
    renderApp();
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
    const speRow = document.getElementById('speRowAction');
    const speBtn = document.querySelector('.btn-header-spe');
    const optBtn = document.getElementById('btnOptionnels');
    const coEnsBtn = document.getElementById('btnCoEnseignement');

    const showSpe = hasAnySpecialite();
    const showOpt = hasAnyOptionnel();
    const showCoEns = epleIdentity.enableCoEnseignement || false;

    if (speRow) {
        speRow.style.display = (showSpe || showOpt || showCoEns) ? 'flex' : 'none';
    }
    if (speBtn) {
        speBtn.style.display = showSpe ? 'inline-flex' : 'none';
    }
    if (optBtn) {
        optBtn.style.display = showOpt ? 'inline-flex' : 'none';
    }
    if (coEnsBtn) {
        coEnsBtn.style.display = showCoEns ? 'inline-flex' : 'none';
    }
}

// 🎓 MODALE SPÉCIALITÉS
function openSpecialiteModal() {
    renderSpecialiteContent();
    document.getElementById('specialiteModal').classList.add('active');
}

function closeSpecialiteModal() {
    document.getElementById('specialiteModal').classList.remove('active');
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

        let levelSpeHtml = '';

        Object.keys(dataStore).forEach(disc => {
            const speServices = dataStore[disc].services.filter(s => s.level === lvl && s.isSpecialite);

            speServices.forEach(s => {
                const activeTeachers = dataStore[disc].teachers.filter(t => (parseFloat(s.allocations[t]) || 0) > 0);

                let teachersListHtml = '';
                if (activeTeachers.length > 0) {
                    teachersListHtml = activeTeachers.map(t => {
                        const h = parseFloat(s.allocations[t]) || 0;
                        return `<span class="spe-teacher-badge">👤 ${t} (${h.toFixed(1)} h)</span>`;
                    }).join('');
                } else {
                    teachersListHtml = '<span style="font-size: 0.8rem; color: var(--text-muted); font-style: italic;">Aucun enseignant affecté</span>';
                }

                levelSpeHtml += `
                    <div class="spe-card">
                        <div class="spe-card-title">${s.name} <span style="font-size: 0.8rem; font-weight: 500; color: var(--text-muted);">(${disc})</span></div>
                        <div class="spe-card-info">
                            Volume horaire : <strong>${(s.hours || 0).toFixed(1)} h</strong> par classe (Total : <strong>${((s.classes || 0) * (s.hours || 0)).toFixed(1)} h</strong>)
                        </div>
                        <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-top: 6px;">Intervenants :</div>
                        <div class="spe-teachers-list">
                            ${teachersListHtml}
                        </div>
                    </div>
                `;
            });
        });

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

    const epleLabel = epleIdentity && epleIdentity.name ? `_${epleIdentity.name.replace(/[^a-zA-Z0-9]+/g, '_')}` : '';
    const dateStr = new Date().toISOString().slice(0, 10);
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
                    <input type="number" min="0" step="1" value="${item.classes}" oninput="updateOptServiceProperty('${disc.replace(/'/g, "\\'")}', ${sIndex}, 'classes', parseFloat(this.value)||0)">
                </td>
                <td style="width: 80px;">
                    <input type="number" min="0" step="0.5" value="${item.hours}" oninput="updateOptServiceProperty('${disc.replace(/'/g, "\\'")}', ${sIndex}, 'hours', parseFloat(this.value)||0)">
                </td>
                <td style="text-align: center; width: 120px;">
                    <div class="checkbox-container">
                        <input type="checkbox" ${item.ponderationActive ? 'checked' : ''} onchange="updateOptServiceProperty('${disc.replace(/'/g, "\\'")}', ${sIndex}, 'ponderationActive', this.checked)">
                        <input type="number" step="0.05" min="1" value="${item.ponderationFactor}" style="width: 55px;" ${!item.ponderationActive ? 'disabled' : ''} onchange="updateOptServiceProperty('${disc.replace(/'/g, "\\'")}', ${sIndex}, 'ponderationFactor', parseFloat(this.value)||1)">
                    </div>
                </td>
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
                        <th>Pondération</th>
                        ${makeHeader('vol', 'Total')}
                        ${makeHeader('financed', 'Vol. horaire financé par la dotation')}
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
                <tfoot>
                    <tr class="totals-row grand-total">
                        <td colspan="6" style="text-align: right;">Total des enseignements optionnels :</td>
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
    const autonomieLabelEl = document.getElementById('autonomieBtnLabel');
    const autonomieModalTitleEl = document.getElementById('autonomieModalTitle');
    if (epleIdentity && epleIdentity.name && epleIdentity.name.trim() !== '') {
        mainTitleEl.textContent = `VectisDHG Autonomie - ${epleIdentity.name}`;
        if (autonomieLabelEl) {
            autonomieLabelEl.textContent = `Autonomie ${epleIdentity.name}`;
            autonomieLabelEl.title = `Autonomie ${epleIdentity.name}`;
        }
        if (autonomieModalTitleEl) {
            autonomieModalTitleEl.textContent = `Autonomie ${epleIdentity.name}`;
        }
    } else {
        mainTitleEl.textContent = "VectisDHG Autonomie";
        if (autonomieLabelEl) {
            autonomieLabelEl.textContent = 'Autonomie EPLE';
            autonomieLabelEl.title = '';
        }
        if (autonomieModalTitleEl) {
            autonomieModalTitleEl.textContent = 'Autonomie EPLE';
        }
    }
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
    if (Array.isArray(s.levels) && s.levels.length > 0) {
        return s.levels.includes(lvl);
    }
    return s.level === lvl;
}

// Renvoie la liste des niveaux d'un service (gère les services optionnels multi-niveaux)
function getServiceLevels(s) {
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
        const classes = parseInt(row.dataset.classes, 10) || 0;

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
                const rClasses = parseInt(r.dataset.classes, 10) || 0;
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
                            servicesByIntitule[intitule] = { classes: 0, hours: 0, otherLevels: new Set(), isCoEns: false };
                        }
                        servicesByIntitule[intitule].classes += (s.classes || 0);
                        servicesByIntitule[intitule].hours = (s.hours || 0);
                        if (s.isCoEnseignement) {
                            servicesByIntitule[intitule].isCoEns = true;
                        }
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

                Object.keys(dataStore).forEach(disc => {
                    dataStore[disc].services.forEach(s => {
                        if (serviceMatchesLevel(s, lvl) && s.name && s.name.trim() === intitule) {
                            totalClasses += (s.classes || 0);
                            volumeHours = (s.hours || 0);
                            if (s.isCoEnseignement) {
                                hasCoEns = true;
                            }
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
                            isCoEnseignement: s.isCoEnseignement || false
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

        let levelHasServices = false;

        Object.keys(dataStore).forEach(disc => {
            const data = dataStore[disc];
            const levelServices = data.services
                .map((s, sIndex) => ({ s, sIndex }))
                .filter(entry => serviceMatchesLevel(entry.s, lvl));

            if (levelServices.length > 0) {
                levelHasServices = true;

                const activeTeachers = data.teachers.filter(teacher => {
                    return levelServices.some(entry => (parseFloat(entry.s.allocations[teacher]) || 0) > 0);
                });

                const card = document.createElement('div');
                card.className = 'level-discipline-card';

                let cardHtml = `<h3>${disc}</h3>`;

                if (activeTeachers.length === 0) {
                    cardHtml += '<p style="color: var(--text-muted); font-style: italic; font-size: 0.85rem;">Services définis mais aucune heure attribuée aux enseignants.</p>';
                } else {
                    cardHtml += `
                        <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Intitulé Service</th>
                                    <th style="text-align: center;">Nbr. Classe</th>
                                    <th style="text-align: center;">Vol. Classe</th>
                                    <th style="text-align: center;">À ventiler</th>
                    `;

                    activeTeachers.forEach(t => {
                        cardHtml += `<th style="text-align: center;">${t}</th>`;
                    });

                    cardHtml += `</tr></thead><tbody>`;

                    const teacherSums = {};
                    activeTeachers.forEach(t => teacherSums[t] = 0);

                    levelServices.forEach(entry => {
                        const s = entry.s;
                        const target = (s.classes || 0) * (s.hours || 0);
                        const svcLevels = getServiceLevels(s);
                        const linkedBadge = svcLevels.length > 1
                            ? buildLinkedLevelsBadgeHtml(svcLevels.filter(l => l !== lvl))
                            : '';
                        cardHtml += `
                            <tr>
                                <td>
                                    <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                                        <span>${s.name}</span>
                                        ${linkedBadge}
                                    </div>
                                </td>
                                <td style="text-align: center;">${s.classes || 0}</td>
                                <td style="text-align: center;">${s.hours || 0} h</td>
                                <td style="text-align: center;"><strong>${target.toFixed(1)} h</strong></td>
                        `;

                        activeTeachers.forEach(t => {
                            const val = parseFloat(s.allocations[t]) || 0;
                            teacherSums[t] += val;
                            let cellContent = val > 0 ? `${val.toFixed(1)} h` : '-';
                            if (val > 0 && s.isCoEnseignement) {
                                const partners = getCoEnseignementPartnersForRow(disc, entry.sIndex, t);
                                if (partners.length > 0) {
                                    cellContent = `
                                        <div style="display: flex; flex-direction: column; align-items: center; gap: 3px;">
                                            <span>${val.toFixed(1)} h</span>
                                            ${buildCoEnsPartnerBadgesHtml(partners)}
                                        </div>
                                    `;
                                }
                            }
                            cardHtml += `<td style="text-align: center;" class="teacher-cell">${cellContent}</td>`;
                        });

                        cardHtml += `</tr>`;
                    });

                    cardHtml += `</tbody><tfoot><tr class="totals-row"><td colspan="4" style="text-align: right;"><strong>Total affecté sur ${lvl} :</strong></td>`;
                    activeTeachers.forEach(t => {
                        cardHtml += `<td style="text-align: center;"><strong>${teacherSums[t].toFixed(1)} h</strong></td>`;
                    });
                    cardHtml += `</tr></tfoot></table></div>`;
                }

                card.innerHTML = cardHtml;
                contentDiv.appendChild(card);
            }
        });

        if (!levelHasServices) {
            contentDiv.innerHTML = `<p class="empty-state">Aucun service n'a été créé pour le niveau <strong>${lvl}</strong>.</p>`;
        }

        contentsContainer.appendChild(contentDiv);
    });
}

function switchLevelTab(activeIndex) {
    document.querySelectorAll('#levelTabsContainer .level-tab-btn').forEach((btn, i) => btn.classList.toggle('active', i === activeIndex));
    document.querySelectorAll('#levelContentsContainer .tab-content').forEach((content, i) => content.classList.toggle('active', i === activeIndex));
}

function openSettingsModal() {
    renderSettingsModal();
    document.getElementById('settingsModal').classList.add('active');
}

function closeSettingsModal() {
    document.getElementById('settingsModal').classList.remove('active');
}

function switchSettingsTab(tab) {
    settingsActiveTab = tab;
    document.getElementById('btnSettingsEple').classList.toggle('active', tab === 'eple');
    document.getElementById('btnSettingsLevels').classList.toggle('active', tab === 'levels');
    document.getElementById('btnSettingsDisc').classList.toggle('active', tab === 'disciplines');
    
    document.getElementById('settingsEpleTab').classList.toggle('active', tab === 'eple');
    document.getElementById('settingsLevelsTab').classList.toggle('active', tab === 'levels');
    document.getElementById('settingsDisciplinesTab').classList.toggle('active', tab === 'disciplines');
    
    renderSettingsModal();
}

function renderSettingsModal() {
    if (settingsActiveTab === 'eple') {
        renderEpleSelectedCard();
    } else if (settingsActiveTab === 'levels') {
        renderLevelsList();
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

function saveState() {
    const exportObject = {
        epleIdentity: epleIdentity,
        dotation: dotationGlobal,
        levels: levels,
        baseHoursStore: baseHoursStore,
        dataStore: dataStore,
        coEnseignementGroups: coEnseignementGroups
    };
    const blob = new Blob([JSON.stringify(exportObject, null, 2)], { type: 'application/json' });
    const blobUrl = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0, 10);

    downloadAnchor.setAttribute("href", blobUrl);
    downloadAnchor.setAttribute("download", `VectisDHG_sauvegarde_${dateStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
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
        }
    } else if (typeof loadedData === 'object' && loadedData !== null) {
        dataStore = loadedData;
    }

    currentActiveTabIndex = 0;
    currentAutonomieTabLevelIndex = 0;
    currentAutonomieTabDiscIndex = 0;
    currentAutonomieTabDisciplinesIndex = 0;
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
            const apportVal = parseFloat(r.Apport !== undefined ? r.Apport : (r.apport !== undefined ? r.apport : 18)) || 0;
            
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
}

function switchTab(activeIndex) {
    currentActiveTabIndex = activeIndex;
    document.querySelectorAll('#tabsContainer .tab-btn').forEach((btn, i) => btn.classList.toggle('active', i === activeIndex));
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

    const discTitle = document.createElement('h3');
    discTitle.className = 'discipline-table-title';
    discTitle.textContent = disc;
    bar.appendChild(discTitle);

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
            name: "Nouveau service",
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
            dataStore[disc].teachers.push(trimmed);
            if (!dataStore[disc].apports) dataStore[disc].apports = {};
            dataStore[disc].apports[trimmed] = 18;
            renderApp();
        }
    };

    const deleteToggleBtn = document.createElement('button');
    const isDeleteMode = dataStore[disc].deleteMode;
    deleteToggleBtn.className = `btn-danger-mode ${isDeleteMode ? 'active' : ''}`;
    deleteToggleBtn.textContent = isDeleteMode ? '✖ Masquer la suppression' : '🗑️ Suppression';
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
    mainRow.appendChild(deleteToggleBtn);

    if (isDeleteMode) {
        const deleteDiscBtn = document.createElement('button');
        deleteDiscBtn.className = 'btn-danger-mode';
        deleteDiscBtn.textContent = '🗑️ Supprimer cette discipline';
        deleteDiscBtn.onclick = () => deleteDiscipline(disc);
        mainRow.appendChild(deleteDiscBtn);
    }

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

        if (grandTotalCell && hsaCell) {
            const grandTotalVal = parseFloat(grandTotalCell.dataset.grandtotal) || 0;
            const hsaVal = grandTotalVal - val;

            const badgeClass = hsaVal >= 0 ? 'success' : 'danger';
            hsaCell.innerHTML = `<span class="badge ${badgeClass}">${hsaVal > 0 ? '+' : ''}${hsaVal.toFixed(2)} h</span>`;
        }
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

function updateService(disc, sIndex, key, value, inputEl) {
    dataStore[disc].services[sIndex][key] = value;

    if (key === 'isSpecialite' || key === 'isOptionnel') {
        updateSpecialiteButtonVisibility();
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

            if (s.ponderationActive && tVal > 0) {
                if (Math.abs(factor - 1.1) < 0.01) {
                    teacher11RawSums[t] += tVal * 0.1;
                } else {
                    teacherTotalsPond[t] += tVal * (factor - 1);
                }
            }
        });
    });

    data.teachers.forEach(t => {
        teacherTotalsPond[t] += Math.min(teacher11RawSums[t], 1.0);
    });

    data.teachers.forEach(t => {
        const rawCell = table.querySelector(`.raw-total-cell[data-teacher="${t}"]`);
        if (rawCell) {
            rawCell.textContent = `${teacherTotalsRaw[t].toFixed(1)} h`;
        }

        const pondCell = table.querySelector(`.pond-total-cell[data-teacher="${t}"]`);
        if (pondCell) {
            pondCell.textContent = `+${teacherTotalsPond[t].toFixed(2)} h`;
        }

        const grandTotal = teacherTotalsRaw[t] + teacherTotalsPond[t];
        const grandTotalCell = table.querySelector(`.grand-total-cell[data-teacher="${t}"]`);
        if (grandTotalCell) {
            grandTotalCell.dataset.grandtotal = grandTotal;
            grandTotalCell.textContent = `${grandTotal.toFixed(2)} h`;
        }

        const hsaCell = table.querySelector(`.hsa-cell[data-teacher="${t}"]`);
        if (hsaCell) {
            const apportVal = data.apports[t] !== undefined ? data.apports[t] : 18;
            const hsaVal = grandTotal - apportVal;
            const badgeClass = hsaVal >= 0 ? 'success' : 'danger';
            hsaCell.innerHTML = `<span class="badge ${badgeClass}">${hsaVal > 0 ? '+' : ''}${hsaVal.toFixed(2)} h</span>`;
        }
    });
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
        { key: 'ponderation', label: 'Pondération' },
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
            ? `<button class="delete-btn-icon" title="Supprimer cet enseignant" onclick="deleteTeacher('${disc}', ${tIndex})">✕</button>` 
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
                        <label>Apport :</label>
                        <input type="number" step="0.5" min="0" value="${currentApport}" 
                            oninput="updateApport('${disc}', '${t.replace(/'/g, "\\'")}', this.value, this)">
                    </div>
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

            if (service.ponderationActive && val > 0) {
                if (Math.abs(factor - 1.1) < 0.01) {
                    teacher11RawSums[t] += val * 0.1;
                } else {
                    teacherTotalsPond[t] += val * (factor - 1);
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
                <td>
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
                        <input type="text" class="name-input" value="${service.name}" ${isLocked ? 'disabled' : ''} onchange="updateService('${anchorDisc}', ${sIndex}, 'name', this.value, null)">
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
                    <input type="number" class="classes-input" min="0" step="1" value="${service.classes}" ${isLocked ? 'disabled' : ''} oninput="updateService('${anchorDisc}', ${sIndex}, 'classes', parseFloat(this.value)||0, this)">
                </td>
                <td>
                    <input type="number" class="hours-input" min="0" step="0.5" value="${service.hours}" ${isLocked ? 'disabled' : ''} oninput="updateService('${anchorDisc}', ${sIndex}, 'hours', parseFloat(this.value)||0, this)">
                </td>
                <td>
                    <div class="checkbox-container">
                        <input type="checkbox" ${service.ponderationActive ? 'checked' : ''} ${isLocked ? 'disabled' : ''}
                            onchange="updateService('${anchorDisc}', ${sIndex}, 'ponderationActive', this.checked, null)">
                        <input type="number" step="0.05" min="1" value="${service.ponderationFactor || 1.1}" 
                            style="width: 60px;" ${(!service.ponderationActive || isLocked) ? 'disabled' : ''}
                            onchange="updateService('${anchorDisc}', ${sIndex}, 'ponderationFactor', parseFloat(this.value)||1, null)">
                    </div>
                    ${service.ponderationActive ? `<div class="ponderation-box">+${rawLineSurplus.toFixed(2)}h pond.</div>` : ''}
                </td>
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
        teacherTotalsPond[t] += Math.min(teacher11RawSums[t], 1.0);
    });

    let tfootHtml = '<tfoot>';
    
    tfootHtml += '<tr class="totals-row"><td colspan="7">Total des heures attribuées</td>';
    data.teachers.forEach(t => {
        tfootHtml += `<td class="raw-total-cell" data-teacher="${t}">${teacherTotalsRaw[t].toFixed(1)} h</td>`;
    });
    tfootHtml += '</tr>';

    tfootHtml += '<tr class="totals-row"><td colspan="7">Pondérations (plafonné à 1h max pour pondér. 1.1)</td>';
    data.teachers.forEach(t => {
        tfootHtml += `<td class="pond-total-cell" data-teacher="${t}">+${teacherTotalsPond[t].toFixed(2)} h</td>`;
    });
    tfootHtml += '</tr>';

    tfootHtml += '<tr class="totals-row grand-total"><td colspan="7">Total des heures (brut + pondération)</td>';
    data.teachers.forEach(t => {
        const grandTotal = teacherTotalsRaw[t] + teacherTotalsPond[t];
        tfootHtml += `<td class="grand-total-cell" data-teacher="${t}" data-grandtotal="${grandTotal}">${grandTotal.toFixed(2)} h</td>`;
    });
    tfootHtml += '</tr>';

    tfootHtml += '<tr class="totals-row hsa-row"><td colspan="7">HSA (Total général - Apport)</td>';
    data.teachers.forEach(t => {
        const grandTotal = teacherTotalsRaw[t] + teacherTotalsPond[t];
        const apportVal = data.apports[t] !== undefined ? data.apports[t] : 18;
        const hsaVal = grandTotal - apportVal;

        const badgeClass = hsaVal >= 0 ? 'success' : 'danger';
        tfootHtml += `<td class="hsa-cell" data-teacher="${t}">
            <span class="badge ${badgeClass}">${hsaVal > 0 ? '+' : ''}${hsaVal.toFixed(2)} h</span>
        </td>`;
    });
    tfootHtml += '</tr></tfoot>';

    tbodyHtml += '</tbody>';
    table.innerHTML = theadHtml + tbodyHtml + tfootHtml;
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

    let grandRaw = 0;
    let grandHsa = 0;
    let grandEpleTotalGeneral = 0;
    let grandTeachersCount = 0;

    disciplines.forEach(disc => {
        const data = dataStore[disc];
        if (!data.apports) data.apports = {};
        grandTeachersCount += data.teachers.length;

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

                if (service.ponderationActive && val > 0) {
                    if (Math.abs(factor - 1.1) < 0.01) {
                        teacherPond11Sums[t] += val * 0.1;
                    } else {
                        teacherRawTotals[t] += val * (factor - 1);
                    }
                }
            });
        });

        data.teachers.forEach(t => {
            const grandTotalTeacher = teacherRawTotals[t] + Math.min(teacherPond11Sums[t], 1.0);
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
                        <th style="text-align: center;">Volume ventilé</th>
                        <th style="text-align: center;">HSA</th>
                        <th style="text-align: center;">Total (pondérations comprises)</th>
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

                    if (service.ponderationActive && val > 0) {
                        if (Math.abs(factor - 1.1) < 0.01) {
                            teacherPond11Sums[t] += val * 0.1;
                        } else {
                            teacherRawTotals[t] += val * (factor - 1);
                        }
                    }
                });
            });

            data.teachers.forEach(t => {
                const grandTotalTeacher = teacherRawTotals[t] + Math.min(teacherPond11Sums[t], 1.0);
                const apportVal = data.apports[t] !== undefined ? data.apports[t] : 18;
                discHsaTotal += (grandTotalTeacher - apportVal);
                discGrandTotal += grandTotalTeacher;
            });

            const hsaBadgeClass = discHsaTotal >= 0 ? 'success' : 'danger';

            html += `
                <tr>
                    <td><strong>${disc}</strong></td>
                    <td style="text-align: center;">${data.teachers.length}</td>
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
    renderTrmdContent();
}

function buildTrmdSheetData() {
    const disciplines = Object.keys(dataStore);

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

                if (service.ponderationActive && val > 0) {
                    if (Math.abs(factor - 1.1) < 0.01) {
                        teacherPond11Sums[t] += val * 0.1;
                    } else {
                        teacherRawTotals[t] += val * (factor - 1);
                    }
                }
            });
        });

        data.teachers.forEach(t => {
            const grandTotalTeacher = teacherRawTotals[t] + Math.min(teacherPond11Sums[t], 1.0);
            const apportVal = data.apports[t] !== undefined ? data.apports[t] : 18;
            discHsaTotal += (grandTotalTeacher - apportVal);
            discGrandTotal += grandTotalTeacher;
        });

        grandRaw += allocatedRaw;
        grandHsa += discHsaTotal;
        grandEpleTotalGeneral += discGrandTotal;
        grandTeachersCount += data.teachers.length;

        tableRows.push([
            disc,
            data.teachers.length,
            parseFloat(allocatedRaw.toFixed(1)),
            parseFloat(discHsaTotal.toFixed(2)),
            parseFloat(discGrandTotal.toFixed(2))
        ]);
    });

    tableRows.push([
        'TOTAL EPLE',
        grandTeachersCount,
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
        ['Discipline', 'Nb Ens.', 'Volume ventilé (h)', 'HSA (h)', 'Total (pondérations comprises) (h)'],
        ...tableRows
    ];
}

function buildTrmdSheet() {
    const ws = XLSX.utils.aoa_to_sheet(buildTrmdSheetData());
    ws['!cols'] = [
        { wch: 28 }, { wch: 10 }, { wch: 20 }, { wch: 12 }, { wch: 26 }
    ];
    ws['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } },
        { s: { r: 1, c: 0 }, e: { r: 1, c: 4 } }
    ];
    return ws;
}

async function exportTrmdToExcel() {
    try {
        await ensureXlsxLoaded();
    } catch (err) {
        alert(err.message);
        return;
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, buildTrmdSheet(), 'TRMD');

    const epleLabel = epleIdentity && epleIdentity.name ? `_${epleIdentity.name.replace(/[^a-zA-Z0-9]+/g, '_')}` : '';
    const dateStr = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `TRMD${epleLabel}_${dateStr}.xlsx`);
}

function exportTrmdToPdf() {
    triggerPrint();
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

            if (service.ponderationActive && val > 0) {
                if (Math.abs(factor - 1.1) < 0.01) {
                    teacher11RawSums[t] += val * 0.1;
                } else {
                    teacherTotalsPond[t] += val * (factor - 1);
                }
            }
        });

        rows.push(row);
    });

    teachers.forEach(t => {
        teacherTotalsPond[t] += Math.min(teacher11RawSums[t], 1.0);
    });

    const totalRow = ['', '', '', '', '', 'Total alloué (h)'];
    teachers.forEach(t => totalRow.push(parseFloat(teacherTotalsRaw[t].toFixed(2))));
    rows.push(totalRow);

    const grandTotalRow = ['', '', '', '', '', 'Total général (h)'];
    teachers.forEach(t => grandTotalRow.push(parseFloat((teacherTotalsRaw[t] + teacherTotalsPond[t]).toFixed(2))));
    rows.push(grandTotalRow);

    const apportRow = ['', '', '', '', '', 'Apport (h)'];
    teachers.forEach(t => apportRow.push(data.apports[t] !== undefined ? data.apports[t] : 18));
    rows.push(apportRow);

    const hsaRow = ['', '', '', '', '', 'HSA (h)'];
    teachers.forEach(t => {
        const grandTotal = teacherTotalsRaw[t] + teacherTotalsPond[t];
        const apport = data.apports[t] !== undefined ? data.apports[t] : 18;
        hsaRow.push(parseFloat((grandTotal - apport).toFixed(2)));
    });
    rows.push(hsaRow);

    return rows;
}

function buildDisciplineSheet(disc) {
    const ws = XLSX.utils.aoa_to_sheet(buildDisciplineSheetData(disc));
    ws['!cols'] = [
        { wch: 12 }, { wch: 28 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }
    ];
    return ws;
}

function sanitizeSheetName(name) {
    const cleaned = (name || '').replace(/[\\\/\?\*\[\]:]/g, ' ').trim().substring(0, 31);
    return cleaned || 'Feuille';
}

function openTableExportModal() {
    renderTableExportDisciplinesList();
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

async function performTableExport() {
    const format = document.querySelector('input[name="exportFormat"]:checked').value;
    const mode = document.querySelector('input[name="exportMode"]:checked').value;
    const includeTrmd = document.getElementById('exportIncludeTrmd').checked;
    const selectedDiscs = Array.from(document.querySelectorAll('.export-disc-checkbox:checked')).map(cb => cb.value);

    if (selectedDiscs.length === 0 && !includeTrmd) {
        alert("Veuillez sélectionner au moins une discipline ou le TRMD à exporter.");
        return;
    }

    try {
        await ensureXlsxLoaded();
    } catch (err) {
        alert(err.message);
        return;
    }

    const dateStr = new Date().toISOString().slice(0, 10);
    const epleLabel = epleIdentity && epleIdentity.name ? `_${epleIdentity.name.replace(/[^a-zA-Z0-9]+/g, '_')}` : '';

    if (mode === 'single') {
        const wb = XLSX.utils.book_new();
        if (includeTrmd) {
            XLSX.utils.book_append_sheet(wb, buildTrmdSheet(), 'TRMD');
        }
        selectedDiscs.forEach(disc => {
            XLSX.utils.book_append_sheet(wb, buildDisciplineSheet(disc), sanitizeSheetName(disc));
        });
        XLSX.writeFile(wb, `Export${epleLabel}_${dateStr}.${format}`, { bookType: format });
    } else {
        // Les navigateurs bloquent ou n'enclenchent que le dernier téléchargement lorsque
        // plusieurs fichiers sont générés dans la même boucle synchrone : on espace donc
        // chaque téléchargement pour que chaque fichier soit bien pris en compte.
        const downloads = [];

        if (includeTrmd) {
            downloads.push(() => {
                const wbTrmd = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wbTrmd, buildTrmdSheet(), 'TRMD');
                XLSX.writeFile(wbTrmd, `TRMD${epleLabel}_${dateStr}.${format}`, { bookType: format });
            });
        }

        selectedDiscs.forEach(disc => {
            downloads.push(() => {
                const wbDisc = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wbDisc, buildDisciplineSheet(disc), sanitizeSheetName(disc));
                const safeDiscName = disc.replace(/[^a-zA-Z0-9]+/g, '_');
                XLSX.writeFile(wbDisc, `${safeDiscName}_${dateStr}.${format}`, { bookType: format });
            });
        });

        downloads.forEach((downloadFn, i) => {
            setTimeout(downloadFn, i * 400);
        });
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
        });
        renderApp();
    }
}