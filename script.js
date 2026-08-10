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
    enableCoEnseignement: false
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
        btn.className = `tab-btn ${idx === 0 ? 'active' : ''}`;
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
                            <strong>${s.classes || 0}</strong> classe(s)/groupe(s) • Volume horaire : <strong>${(s.hours || 0).toFixed(1)} h</strong> par classe (Total : <strong>${((s.classes || 0) * (s.hours || 0)).toFixed(1)} h</strong>)
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
    document.querySelectorAll('#speTabsContainer .tab-btn').forEach((btn, i) => btn.classList.toggle('active', i === activeIndex));
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
                        <span style="font-size: 0.75rem; font-weight: 600; color: var(--amber-text); background: var(--amber-bg); border: 1px solid var(--amber-border); padding: 2px 6px; border-radius: 4px; white-space: nowrap;">🔗 Fusionné</span>
                        <button type="button" class="delete-btn-icon" title="Dissocier ce groupe" onclick="dissociateCoEnseignementGroup('${group.id}')">✕</button>
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

function printCoEnseignementContent() {
    window.print();
}

function exportCoEnseignementToExcel() {
    const allRows = getCoEnseignementTeacherRows();

    if (allRows.length === 0) {
        alert("Aucun service en co-enseignement à exporter.");
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
    if (epleIdentity && epleIdentity.name && epleIdentity.name.trim() !== '') {
        mainTitleEl.textContent = `VectisDHG Autonomie - ${epleIdentity.name}`;
        if (autonomieLabelEl) {
            autonomieLabelEl.textContent = `Autonomie ${epleIdentity.name}`;
            autonomieLabelEl.title = `Autonomie ${epleIdentity.name}`;
        }
    } else {
        mainTitleEl.textContent = "VectisDHG Autonomie";
        if (autonomieLabelEl) {
            autonomieLabelEl.textContent = 'Autonomie EPLE';
            autonomieLabelEl.title = '';
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
            btn.className = `tab-btn ${isActive ? 'active' : ''}`;
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
    } else {
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
    }
}

function switchAutonomieTab(activeIndex) {
    if (autonomieMode === 'level') {
        currentAutonomieTabLevelIndex = activeIndex;
    } else if (autonomieMode === 'disc') {
        currentAutonomieTabDiscIndex = activeIndex;
    } else {
        currentAutonomieTabDisciplinesIndex = activeIndex;
    }
    document.querySelectorAll('#autonomieTabsContainer .tab-btn').forEach((btn, i) => btn.classList.toggle('active', i === activeIndex));
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
        btn.className = `tab-btn ${idx === 0 ? 'active' : ''}`;
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
    document.querySelectorAll('#levelTabsContainer .tab-btn').forEach((btn, i) => btn.classList.toggle('active', i === activeIndex));
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
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObject, null, 2));
    const downloadAnchor = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0, 10);
    
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `VectisDHG_sauvegarde_${dateStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function handleJsonLoad(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const loadedData = JSON.parse(event.target.result);
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
                    dataStore[disc].services.forEach(s => {
                        if (s.locked === undefined) s.locked = false;
                        if (s.isSpecialite === undefined) s.isSpecialite = false;
                        if (s.isOptionnel === undefined) s.isOptionnel = false;
                        if (s.isCoEnseignement === undefined) s.isCoEnseignement = false;
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
        } catch (err) {
            alert("Erreur lors de la lecture du fichier JSON.");
        }
    };
    reader.readAsText(file);
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

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
                dataStore[discipline] = { deleteMode: false, enableSpecialites: false, enableOptionnels: false, enableCoEnseignement: false, sortCol: null, sortAsc: true, teachers: [], apports: {}, services: [] };
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

    mainRow.appendChild(addServiceBtn);
    mainRow.appendChild(addTeacherBtn);
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
        if (isOpt) {
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

function exportTrmdToExcel() {
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, buildTrmdSheet(), 'TRMD');

    const epleLabel = epleIdentity && epleIdentity.name ? `_${epleIdentity.name.replace(/[^a-zA-Z0-9]+/g, '_')}` : '';
    const dateStr = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `TRMD${epleLabel}_${dateStr}.xlsx`);
}

function exportTrmdToPdf() {
    window.print();
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