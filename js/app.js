document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initNumberCounters();
  initDateRestrictions();
  initComparisonSlider();
  initTreatmentFilters();
  initModals();
  initAppointmentBooking();
  initDentalTourismCalculator();
  initEmergencyWizard();
  initBranchSelector();
  initMobileMenu();
  initAppointmentsViewer();
  initScrollReveal();
});

// Toast notification helper
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item ${type === 'error' ? 'error' : ''}`;
  const icon = type === 'error' ? 'error' : 'check_circle';
  const iconColor = type === 'error' ? 'text-secondary' : 'text-primary';

  toast.innerHTML = `
    <span class="material-symbols-outlined ${iconColor} text-[22px]">${icon}</span>
    <div class="flex-1 text-[13px] text-text-main font-medium leading-snug">${message}</div>
    <button class="text-text-muted hover:text-text-main cursor-pointer" onclick="this.parentElement.remove()">
      <span class="material-symbols-outlined text-[16px]">close</span>
    </button>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 4500);
}

// 1. DATE RESTRICTIONS (No past dates)
function initDateRestrictions() {
  const dateInput = document.getElementById('preferred-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];

    dateInput.addEventListener('change', (e) => {
      const selected = new Date(e.target.value);
      if (selected.getUTCDay() === 0) { // Sunday
        showToast('Sundays are strictly reserved for emergency triage & acute pain cases.', 'error');
      }
    });
  }
}

// 2. INTERACTIVE BEFORE & AFTER SLIDER + MULTI-CASE SWITCHER
let currentCaseIndex = 0;
function initComparisonSlider() {
  const container = document.getElementById('comparison-container');
  const rangeInput = document.getElementById('comparison-range');
  const presetBtns = document.querySelectorAll('.preset-btn');
  const beforeImg = document.getElementById('before-img');
  const afterImg = document.getElementById('after-img');
  const caseTitle = document.getElementById('case-title');
  const caseDesc = document.getElementById('case-desc');
  const caseDuration = document.getElementById('case-duration');
  const caseTechnique = document.getElementById('case-technique');
  const caseDoctor = document.getElementById('case-doctor');
  const caseQuote = document.getElementById('case-quote');
  const caseTabsContainer = document.getElementById('case-tabs-container');

  // Render Case Switcher Tabs
  if (caseTabsContainer && CYMOR_DATA.cases) {
    caseTabsContainer.innerHTML = CYMOR_DATA.cases.map((c, idx) => `
      <button class="case-tab-btn shrink-0 whitespace-nowrap px-4 py-2 rounded-xl text-[13px] font-bold transition-all cursor-pointer ${idx === 0 ? 'bg-primary text-white shadow-xs' : 'bg-surface-tint text-text-muted hover:bg-primary-subtle hover:text-primary border border-border-subtle'}" data-index="${idx}">
        ${c.treatmentType}
      </button>
    `).join('');

    const tabBtns = caseTabsContainer.querySelectorAll('.case-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        loadCase(idx);
        tabBtns.forEach(b => {
          b.classList.remove('bg-primary', 'text-white', 'shadow-xs');
          b.classList.add('bg-surface-tint', 'text-text-muted', 'border', 'border-border-subtle');
        });
        btn.classList.add('bg-primary', 'text-white', 'shadow-xs');
        btn.classList.remove('bg-surface-tint', 'text-text-muted', 'border', 'border-border-subtle');
      });
    });
  }

  function loadCase(index) {
    const c = CYMOR_DATA.cases[index];
    if (!c) return;
    currentCaseIndex = index;
    if (beforeImg) beforeImg.src = c.beforeImg;
    if (afterImg) afterImg.src = c.afterImg;
    if (caseTitle) caseTitle.textContent = c.title;
    if (caseDesc) caseDesc.textContent = c.description;
    if (caseDuration) caseDuration.textContent = c.duration;
    if (caseTechnique) caseTechnique.textContent = c.technique;
    if (caseDoctor) caseDoctor.textContent = c.doctor;
    if (caseQuote) caseQuote.textContent = `"${c.patientQuote}"`;
    updateSliderPosition(50);
  }

  function updateSliderPosition(value) {
    if (!container) return;
    const clamped = Math.max(0, Math.min(100, value));
    container.style.setProperty('--pos', `${clamped}%`);
    if (rangeInput) rangeInput.value = clamped;

    presetBtns.forEach(btn => {
      const target = parseFloat(btn.getAttribute('data-target'));
      if (Math.abs(target - clamped) < 2) {
        btn.classList.add('bg-primary', 'text-white');
        btn.classList.remove('bg-surface-tint', 'text-text-body');
      } else {
        btn.classList.remove('bg-primary', 'text-white');
        btn.classList.add('bg-surface-tint', 'text-text-body');
      }
    });
  }

  if (rangeInput) {
    rangeInput.addEventListener('input', (e) => {
      updateSliderPosition(e.target.value);
    });
  }

  // Direct touch & mouse drag on image container for mobile & desktop
  if (container) {
    let isDragging = false;
    const calculatePosition = (clientX) => {
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = (x / rect.width) * 100;
      updateSliderPosition(pct);
    };

    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches.length > 0) calculatePosition(e.touches[0].clientX);
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches.length > 0) calculatePosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => { isDragging = false; });
    window.addEventListener('touchcancel', () => { isDragging = false; });

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      calculatePosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      calculatePosition(e.clientX);
    });

    window.addEventListener('mouseup', () => { isDragging = false; });
  }

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetVal = parseFloat(btn.getAttribute('data-target'));
      updateSliderPosition(targetVal);
    });
  });

  if (CYMOR_DATA.cases && CYMOR_DATA.cases.length > 0) {
    loadCase(0);
  }
}

// 3. TREATMENT DIRECTORY FILTERING
function initTreatmentFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.treatment-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('bg-primary', 'text-white');
        b.classList.add('text-text-muted');
      });
      btn.classList.add('bg-primary', 'text-white');
      btn.classList.remove('text-text-muted');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category === 'all') {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 4. MODALS (Treatment Detail Modal & Doctor Bio Modal)
function initModals() {
  document.querySelectorAll('[data-treatment-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const treatmentId = btn.getAttribute('data-treatment-modal');
      openTreatmentModal(treatmentId);
    });
  });

  document.querySelectorAll('[data-doctor-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const doctorId = btn.getAttribute('data-doctor-modal');
      openDoctorModal(doctorId);
    });
  });
}

function openTreatmentModal(treatmentId) {
  const treatment = CYMOR_DATA.treatments.find(t => t.id === treatmentId);
  if (!treatment) return;

  const modal = document.getElementById('generic-modal');
  const modalBody = document.getElementById('generic-modal-body');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div class="flex items-start justify-between gap-4 pb-4 border-b border-border-subtle">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-2xl bg-primary-subtle text-primary flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-[28px]">${treatment.icon}</span>
        </div>
        <div>
          <span class="inline-block px-2.5 py-0.5 rounded-full bg-border-teal text-primary text-[11px] font-extrabold uppercase tracking-wider mb-1">${treatment.categoryName}</span>
          <h3 class="text-xl font-bold text-text-main">${treatment.title}</h3>
        </div>
      </div>
      <button onclick="closeGenericModal()" class="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer">
        <span class="material-symbols-outlined text-[20px]">close</span>
      </button>
    </div>

    <div class="py-4 space-y-4 max-h-[65vh] overflow-y-auto modal-scroll pr-2">
      <p class="text-[14px] text-text-body leading-relaxed">${treatment.fullDesc}</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div class="p-3.5 rounded-2xl bg-surface-tint border border-border-subtle">
          <span class="text-[11px] text-text-muted uppercase font-bold block mb-1">Expected Timeline</span>
          <span class="text-[14px] font-bold text-primary">${treatment.duration}</span>
        </div>
        <div class="p-3.5 rounded-2xl bg-surface-tint border border-border-subtle">
          <span class="text-[11px] text-text-muted uppercase font-bold block mb-1">Visits / Sessions</span>
          <span class="text-[14px] font-bold text-text-main">${treatment.sessions}</span>
        </div>
      </div>

      <div>
        <h4 class="text-sm font-bold text-text-main mb-2">Key Clinical Benefits</h4>
        <ul class="space-y-1.5 text-[13px] text-text-body">
          ${treatment.benefits.map(b => `
            <li class="flex items-start gap-2">
              <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span>${b}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div>
        <h4 class="text-sm font-bold text-text-main mb-2">Procedure Stages</h4>
        <div class="space-y-2">
          ${treatment.procedureSteps.map((step, i) => `
            <div class="flex items-center gap-3 p-3 rounded-xl bg-primary-subtle text-[13px]">
              <span class="w-6 h-6 rounded-full bg-primary text-white text-[12px] font-bold flex items-center justify-center shrink-0">${i+1}</span>
              <span class="text-text-main font-medium">${step}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="pt-4 border-t border-border-subtle flex items-center justify-between gap-3">
      <button onclick="closeGenericModal()" class="px-4 py-2 rounded-xl text-text-muted font-bold text-[13px] hover:bg-slate-100 cursor-pointer">Close</button>
      <button onclick="selectTreatmentAndBook('${treatment.category}')" class="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-[13px] flex items-center gap-2 shadow-md cursor-pointer">
        <span class="material-symbols-outlined text-[18px]">calendar_today</span>
        <span>Book ${treatment.title}</span>
      </button>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function openDoctorModal(doctorId) {
  const doctor = CYMOR_DATA.doctors.find(d => d.id === doctorId);
  if (!doctor) return;

  const modal = document.getElementById('generic-modal');
  const modalBody = document.getElementById('generic-modal-body');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div class="flex items-start justify-between gap-4 pb-4 border-b border-border-subtle">
      <div class="flex items-center gap-4">
        <img src="${doctor.image}" alt="${doctor.name}" class="w-16 h-16 rounded-2xl object-cover border border-primary/20"/>
        <div>
          <span class="inline-block px-2.5 py-0.5 rounded-full bg-primary-subtle text-primary text-[11px] font-extrabold uppercase mb-1">${doctor.role}</span>
          <h3 class="text-xl font-bold text-text-main">${doctor.name}</h3>
          <p class="text-[13px] text-primary font-bold">${doctor.qualification} <span class="text-text-muted font-semibold text-[12px] ml-1.5">• Reg. No: ${doctor.regNo}</span></p>
        </div>
      </div>
      <button onclick="closeGenericModal()" class="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer">
        <span class="material-symbols-outlined text-[20px]">close</span>
      </button>
    </div>

    <div class="py-4 space-y-4 max-h-[65vh] overflow-y-auto modal-scroll pr-2">
      <div class="p-3.5 rounded-2xl bg-primary-subtle flex items-center justify-between text-[13px] border border-border-teal">
        <span class="font-bold text-primary flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[18px]">verified</span>
          <span>${doctor.experience}</span>
        </span>
        <span class="text-text-muted flex items-center gap-1">
          <span class="material-symbols-outlined text-[18px]">schedule</span>
          <span>${doctor.availability}</span>
        </span>
      </div>

      <p class="text-[14px] text-text-body leading-relaxed">${doctor.bio}</p>

      <div>
        <h4 class="text-sm font-bold text-text-main mb-2">Areas of Clinical Focus</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          ${doctor.specialties.map(spec => `
            <div class="flex items-center gap-2 p-2.5 rounded-xl bg-surface-tint border border-border-subtle text-[13px] text-text-main">
              <span class="material-symbols-outlined text-primary text-[16px]">check</span>
              <span class="font-medium">${spec}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="pt-4 border-t border-border-subtle flex items-center justify-between gap-3">
      <button onclick="closeGenericModal()" class="px-4 py-2 rounded-xl text-text-muted font-bold text-[13px] hover:bg-slate-100 cursor-pointer">Close</button>
      <button onclick="selectDoctorAndBook('${doctor.treatmentKey}', '${doctor.name}')" class="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-[13px] flex items-center gap-2 shadow-md cursor-pointer">
        <span class="material-symbols-outlined text-[18px]">calendar_today</span>
        <span>Consult ${doctor.name}</span>
      </button>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeGenericModal() {
  const modal = document.getElementById('generic-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}
window.closeGenericModal = closeGenericModal;

function selectTreatmentAndBook(category) {
  closeGenericModal();
  const treatmentSelect = document.getElementById('treatment-type');
  if (treatmentSelect) {
    if (category === 'ortho') treatmentSelect.value = 'orthodontics';
    else if (category === 'surgery') treatmentSelect.value = 'implants';
    else if (category === 'restorative') treatmentSelect.value = 'rct';
    else treatmentSelect.value = 'general';
  }
  const apptSection = document.getElementById('appointment-section');
  if (apptSection) apptSection.scrollIntoView({ behavior: 'smooth' });
}
window.selectTreatmentAndBook = selectTreatmentAndBook;

function selectDoctorAndBook(treatmentKey, doctorName) {
  closeGenericModal();
  const treatmentSelect = document.getElementById('treatment-type');
  if (treatmentSelect && treatmentKey) {
    treatmentSelect.value = treatmentKey;
  }
  const notesField = document.getElementById('patient-notes');
  if (notesField) {
    notesField.value = `Requesting appointment with ${doctorName}.`;
  }
  const apptSection = document.getElementById('appointment-section');
  if (apptSection) apptSection.scrollIntoView({ behavior: 'smooth' });
}
window.selectDoctorAndBook = selectDoctorAndBook;

// 5. APPOINTMENT BOOKING ENGINE & RECEIPT PASS
let latestBooking = null;

function initAppointmentBooking() {
  const form = document.getElementById('dental-appointment-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('patient-name').value.trim();
    const phone = document.getElementById('patient-phone').value.trim();
    const clinic = document.getElementById('preferred-clinic').value;
    const treatment = document.getElementById('treatment-type').value;
    const date = document.getElementById('preferred-date').value;
    const time = document.getElementById('preferred-time').value;
    const notes = document.getElementById('patient-notes').value.trim();

    if (!name || !phone || !date) {
      showToast('Please fill in your name, phone number, and appointment date.', 'error');
      return;
    }

    const token = 'CYM-' + Math.floor(100000 + Math.random() * 900000);
    const booking = {
      token,
      name,
      phone,
      clinic,
      clinicName: getClinicName(clinic),
      treatment,
      treatmentName: getTreatmentName(treatment),
      date,
      time,
      timeLabel: getTimeLabel(time),
      notes,
      createdAt: new Date().toISOString()
    };

    latestBooking = booking;
    saveAppointment(booking);
    openReceiptModal(booking);
    form.reset();
    initDateRestrictions();
  });
}

function getClinicName(id) {
  const b = CYMOR_DATA.branches.find(x => x.id === id);
  return b ? b.name : 'Ponnani Flagship Clinic';
}

function getTreatmentName(val) {
  const map = {
    general: "General Checkup & Cleaning",
    orthodontics: "Orthodontics & Braces (Dr. Nazeer)",
    implants: "Dental Implants & Surgery",
    rct: "Root Canal Therapy (Dr. Sharath)",
    cosmetic: "Smile Designing & Whitening",
    pediatric: "Pediatric Dental Care",
    emergency: "Emergency / Acute Pain Relief"
  };
  return map[val] || val;
}

function getTimeLabel(val) {
  const map = {
    morning: "Morning (10:00 AM - 1:00 PM)",
    afternoon: "Afternoon (2:00 PM - 5:00 PM)",
    evening: "Evening (5:00 PM - 7:00 PM)"
  };
  return map[val] || val;
}

function saveAppointment(booking) {
  try {
    const list = JSON.parse(localStorage.getItem('cymor_appointments') || '[]');
    list.unshift(booking);
    localStorage.setItem('cymor_appointments', JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save to localStorage', err);
  }
}

function openReceiptModal(booking) {
  const modal = document.getElementById('appointment-receipt-modal');
  const content = document.getElementById('receipt-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="text-center pb-4 border-b border-border-subtle">
      <div class="w-14 h-14 mx-auto rounded-full bg-primary-subtle text-primary flex items-center justify-center mb-2 border border-border-teal">
        <span class="material-symbols-outlined text-[32px]">verified</span>
      </div>
      <span class="text-[12px] font-extrabold uppercase tracking-wider text-primary">Appointment Confirmed</span>
      <h3 class="text-xl font-bold text-text-main mt-1">Token: ${booking.token}</h3>
      <p class="text-[13px] text-text-muted mt-0.5">A clinic coordinator will call ${booking.phone} to confirm your slot.</p>
    </div>

    <div class="p-4 rounded-2xl bg-surface-tint border border-border-subtle space-y-2.5 my-4">
      <div class="flex justify-between items-center text-[13px]">
        <span class="text-text-muted">Patient Name:</span>
        <span class="font-bold text-text-main">${booking.name}</span>
      </div>
      <div class="flex justify-between items-center text-[13px]">
        <span class="text-text-muted">Contact Phone:</span>
        <span class="font-bold text-text-main">${booking.phone}</span>
      </div>
      <div class="flex justify-between items-center text-[13px]">
        <span class="text-text-muted">Clinic Centre:</span>
        <span class="font-bold text-primary">${booking.clinicName}</span>
      </div>
      <div class="flex justify-between items-center text-[13px]">
        <span class="text-text-muted">Procedure / Focus:</span>
        <span class="font-bold text-text-main">${booking.treatmentName}</span>
      </div>
      <div class="flex justify-between items-center text-[13px]">
        <span class="text-text-muted">Date & Time:</span>
        <span class="font-bold text-primary">${booking.date} | ${booking.timeLabel}</span>
      </div>
      ${booking.notes ? `
        <div class="pt-2 border-t border-border-subtle text-[13px]">
          <span class="text-text-muted block text-[11px] uppercase font-bold">Notes:</span>
          <span class="text-text-body italic">"${booking.notes}"</span>
        </div>
      ` : ''}
    </div>

    <div class="flex flex-col sm:flex-row gap-2.5 pt-1">
      <button onclick="sendToWhatsApp()" class="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-xs cursor-pointer">
        <span class="material-symbols-outlined text-[20px]">chat</span>
        <span>Send to WhatsApp</span>
      </button>
      <button onclick="downloadCalendarInvite()" class="flex-1 py-3 px-4 rounded-xl bg-surface-card hover:bg-primary-subtle text-primary border border-border-subtle font-bold text-[14px] flex items-center justify-center gap-2 shadow-xs cursor-pointer">
        <span class="material-symbols-outlined text-[20px]">event</span>
        <span>Add to Calendar</span>
      </button>
    </div>

    <div class="flex items-center justify-between pt-4 border-t border-border-subtle mt-4">
      <button onclick="window.print()" class="text-[13px] text-text-muted hover:text-primary flex items-center gap-1 font-medium cursor-pointer">
        <span class="material-symbols-outlined text-[16px]">print</span>
        <span>Print Confirmation Slip</span>
      </button>
      <button onclick="closeReceiptModal()" class="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-[13px] cursor-pointer">
        Done
      </button>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeReceiptModal() {
  const modal = document.getElementById('appointment-receipt-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}
window.closeReceiptModal = closeReceiptModal;

function sendToWhatsApp() {
  if (!latestBooking) return;
  const msg = encodeURIComponent(
    `*CYMOR Dental Clinic Appointment Booking*\n\n` +
    `*Token ID:* ${latestBooking.token}\n` +
    `*Patient Name:* ${latestBooking.name}\n` +
    `*Phone:* ${latestBooking.phone}\n` +
    `*Clinic Branch:* ${latestBooking.clinicName}\n` +
    `*Treatment:* ${latestBooking.treatmentName}\n` +
    `*Date:* ${latestBooking.date}\n` +
    `*Time:* ${latestBooking.timeLabel}\n` +
    (latestBooking.notes ? `*Notes:* ${latestBooking.notes}\n\n` : `\n`) +
    `_Please confirm my consultation slot._`
  );
  window.open(`https://wa.me/${CYMOR_DATA.clinicInfo.whatsappNumber}?text=${msg}`, '_blank');
}
window.sendToWhatsApp = sendToWhatsApp;

function downloadCalendarInvite() {
  if (!latestBooking) return;
  const startIso = latestBooking.date.replace(/-/g, '') + 'T100000Z';
  const endIso = latestBooking.date.replace(/-/g, '') + 'T110000Z';
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CYMOR Dental Clinic//Appointment//EN',
    'BEGIN:VEVENT',
    `UID:${latestBooking.token}@cymordental.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${startIso}`,
    `DTEND:${endIso}`,
    `SUMMARY:CYMOR Dental Appointment (${latestBooking.treatmentName})`,
    `DESCRIPTION:Appointment at ${latestBooking.clinicName} for ${latestBooking.name}. Token: ${latestBooking.token}. Phone: ${CYMOR_DATA.clinicInfo.emergencyPhone}`,
    `LOCATION:${latestBooking.clinicName}, Ponnani, Kerala`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `CYMOR_Appointment_${latestBooking.token}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Calendar invite (.ics) downloaded!');
}
window.downloadCalendarInvite = downloadCalendarInvite;

// 6. DENTAL TOURISM SAVINGS & ESTIMATOR
function initDentalTourismCalculator() {
  const container = document.getElementById('tourism-pricing-table');
  if (!container || !CYMOR_DATA.tourismPricing) return;

  container.innerHTML = `
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-white/20 text-white/75 text-[11px] uppercase font-bold tracking-wider">
            <th class="py-3 px-4">Procedure</th>
            <th class="py-3 px-4 text-white font-extrabold">CYMOR Speciality Price (Kerala)</th>
            <th class="py-3 px-4">Gulf / GCC Average Rate</th>
            <th class="py-3 px-4">NRI Est. Savings</th>
            <th class="py-3 px-4">Treatment Duration</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/10 text-[13px] text-white/90">
          ${CYMOR_DATA.tourismPricing.map(item => `
            <tr class="hover:bg-white/5 transition-colors">
              <td class="py-3.5 px-4 font-bold text-white">${item.procedure}</td>
              <td class="py-3.5 px-4 font-extrabold text-white bg-white/10 rounded-xl">${item.cymorPrice}</td>
              <td class="py-3.5 px-4 text-white/80">${item.gulfPrice}</td>
              <td class="py-3.5 px-4"><span class="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-extrabold text-[12px] border border-emerald-400/30">${item.savingsPct}</span></td>
              <td class="py-3.5 px-4 text-white/80">${item.daysNeeded}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// 7. EMERGENCY SOS & TRIAGE WIZARD
function initEmergencyWizard() {
  const emergencyBtn = document.getElementById('open-emergency-sos-btn');
  const emergencyStripBtn = document.getElementById('open-emergency-strip-btn');

  if (emergencyBtn) emergencyBtn.addEventListener('click', openEmergencyModal);
  if (emergencyStripBtn) emergencyStripBtn.addEventListener('click', openEmergencyModal);
}

function openEmergencyModal(e) {
  if (e) e.preventDefault();
  const modal = document.getElementById('generic-modal');
  const modalBody = document.getElementById('generic-modal-body');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div class="flex items-start justify-between gap-4 pb-4 border-b border-border-subtle bg-red-50 -m-6 p-6 mb-4 rounded-t-3xl border-b border-red-200">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-2xl bg-secondary text-white flex items-center justify-center animate-pulse shrink-0">
          <span class="material-symbols-outlined text-[28px]">emergency</span>
        </div>
        <div>
          <span class="inline-block px-2.5 py-0.5 rounded-full bg-secondary text-white text-[11px] font-extrabold uppercase mb-1">Immediate 24/7 Triage</span>
          <h3 class="text-xl font-extrabold text-text-main">Dental Emergency First-Aid Guide</h3>
        </div>
      </div>
      <button onclick="closeGenericModal()" class="w-8 h-8 rounded-full bg-white text-slate-500 hover:text-slate-800 flex items-center justify-center shadow-xs cursor-pointer">
        <span class="material-symbols-outlined text-[20px]">close</span>
      </button>
    </div>

    <div class="space-y-4 max-h-[60vh] overflow-y-auto modal-scroll pr-1">
      <div class="p-4 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <span class="text-[11px] uppercase font-bold text-secondary block">On-Call Duty Doctor Line</span>
          <span class="text-lg font-black text-text-main">+91 99952 68787</span>
        </div>
        <a href="tel:+919995268787" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary-hover text-white font-bold text-[13px] flex items-center justify-center gap-2 shadow-sm">
          <span class="material-symbols-outlined text-[18px]">phone_in_talk</span>
          <span>Call Doctor Now</span>
        </a>
      </div>

      <div class="space-y-3">
        <h4 class="text-sm font-bold text-text-main">Select Your Emergency Condition:</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5" id="emergency-topic-grid">
          ${CYMOR_DATA.emergencyGuides.map((guide) => `
            <button onclick="showEmergencyDetail('${guide.id}')" class="text-left p-3.5 rounded-2xl bg-surface-tint hover:bg-primary-subtle border border-border-subtle transition-all flex items-center gap-3 group cursor-pointer">
              <span class="w-10 h-10 rounded-xl bg-surface-card text-secondary flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-secondary group-hover:text-white transition-colors">
                <span class="material-symbols-outlined text-[20px]">${guide.icon}</span>
              </span>
              <div>
                <span class="text-[14px] font-bold text-text-main block leading-tight">${guide.title}</span>
                <span class="text-[11px] text-text-muted">Tap for immediate steps</span>
              </div>
            </button>
          `).join('')}
        </div>
        <div id="emergency-detail-box" class="hidden p-4 rounded-2xl bg-primary-subtle border-l-4 border-secondary space-y-2">
          <!-- Populated dynamically -->
        </div>
      </div>
    </div>

    <div class="pt-4 border-t border-border-subtle flex items-center justify-between">
      <button onclick="closeGenericModal()" class="px-4 py-2 rounded-xl text-text-muted font-bold text-[13px] hover:bg-slate-100 cursor-pointer">Close</button>
      <a href="https://wa.me/919995268787?text=EMERGENCY%20TRIAGE%20REQUEST:%20Patient%20needs%20immediate%20dental%20assistance" target="_blank" class="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-[13px] flex items-center gap-1.5 shadow-xs">
        <span class="material-symbols-outlined text-[18px]">chat</span>
        <span>WhatsApp Alert</span>
      </a>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}
window.openEmergencyModal = openEmergencyModal;

function showEmergencyDetail(guideId) {
  const guide = CYMOR_DATA.emergencyGuides.find(g => g.id === guideId);
  if (!guide) return;

  const box = document.getElementById('emergency-detail-box');
  if (!box) return;

  box.classList.remove('hidden');
  box.innerHTML = `
    <div class="flex items-center justify-between mb-2">
      <h5 class="text-[14px] font-bold text-secondary flex items-center gap-1.5">
        <span class="material-symbols-outlined text-[20px]">${guide.icon}</span>
        <span>${guide.title} - What You Must Do Now:</span>
      </h5>
    </div>
    <ol class="space-y-1.5 text-[13px] text-text-body list-decimal list-inside leading-relaxed">
      ${guide.urgentSteps.map(step => `<li>${step}</li>`).join('')}
    </ol>
  `;
}
window.showEmergencyDetail = showEmergencyDetail;

// 8. BRANCH SELECTOR CARDS
function initBranchSelector() {
  const container = document.getElementById('branch-cards-container');
  if (!container || !CYMOR_DATA.branches) return;

  container.innerHTML = CYMOR_DATA.branches.map((b, idx) => `
    <div class="branch-card hover-lift p-5 rounded-3xl bg-surface-card border ${idx === 0 ? 'border-primary shadow-xs' : 'border-border-subtle shadow-2xs'} flex flex-col justify-between transition-all">
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-[15px] font-bold text-text-main">${b.name}</span>
          <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${idx === 0 ? 'bg-primary text-white' : 'bg-surface-tint text-text-muted'}">${b.badge}</span>
        </div>
        <p class="text-[12px] text-text-muted mb-2 leading-relaxed">${b.address}</p>
        <p class="text-[11px] text-text-body mb-4 flex items-center gap-1 font-medium">
          <span class="material-symbols-outlined text-[15px] text-primary">schedule</span>
          <span>${b.timings}</span>
        </p>
      </div>
      <div class="pt-3 border-t border-border-subtle flex items-center justify-between">
        <a href="tel:${b.phone.split('/')[0].replace(/[^0-9+]/g, '')}" class="text-[13px] font-bold text-primary hover:underline flex items-center gap-1">
          <span class="material-symbols-outlined text-[16px]">call</span>
          <span>Call</span>
        </a>
        <a href="${b.mapEmbed}" target="_blank" rel="noopener noreferrer" class="text-[13px] font-medium text-text-muted hover:text-primary flex items-center gap-1">
          <span class="material-symbols-outlined text-[16px]">map</span>
          <span>Map</span>
        </a>
      </div>
    </div>
  `).join('');
}

// 9. MOBILE MENU DRAWER
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-menu-drawer');
  const closeBtn = document.getElementById('close-mobile-menu');
  const navLinks = drawer ? drawer.querySelectorAll('a') : [];

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.remove('hidden');
      drawer.classList.add('flex');
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.add('hidden');
      drawer.classList.remove('flex');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (drawer) {
        drawer.classList.add('hidden');
        drawer.classList.remove('flex');
      }
    });
  });
}

// 10. "MY APPOINTMENTS" LOCAL VIEWER
function initAppointmentsViewer() {
  const viewBtn = document.getElementById('view-my-appointments-btn');
  if (viewBtn) {
    viewBtn.addEventListener('click', openMyAppointmentsModal);
  }
}

function openMyAppointmentsModal() {
  const modal = document.getElementById('generic-modal');
  const modalBody = document.getElementById('generic-modal-body');
  if (!modal || !modalBody) return;

  const bookings = JSON.parse(localStorage.getItem('cymor_appointments') || '[]');

  modalBody.innerHTML = `
    <div class="flex items-start justify-between gap-4 pb-4 border-b border-border-subtle">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-2xl bg-primary-subtle text-primary flex items-center justify-center">
          <span class="material-symbols-outlined text-[22px]">receipt_long</span>
        </div>
        <div>
          <h3 class="text-xl font-bold text-text-main">My Booked Appointments</h3>
          <p class="text-[12px] text-text-muted">Stored securely on your browser</p>
        </div>
      </div>
      <button onclick="closeGenericModal()" class="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer">
        <span class="material-symbols-outlined text-[20px]">close</span>
      </button>
    </div>

    <div class="py-4 space-y-3 max-h-[55vh] overflow-y-auto modal-scroll pr-1">
      ${bookings.length === 0 ? `
        <div class="text-center py-8 text-text-muted">
          <span class="material-symbols-outlined text-[42px] opacity-40 mb-2">calendar_today</span>
          <p class="text-[14px]">No appointments booked yet on this device.</p>
          <a href="#appointment-section" onclick="closeGenericModal()" class="inline-block mt-3 px-4 py-2 rounded-xl bg-primary text-white font-bold text-[13px]">Book Your First Slot</a>
        </div>
      ` : bookings.map(b => `
        <div class="p-3.5 rounded-2xl bg-surface-tint border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="font-extrabold text-primary">${b.token}</span>
              <span class="text-[11px] px-2 py-0.5 rounded-full bg-surface-card border border-border-subtle font-bold text-text-main">${b.date}</span>
            </div>
            <p class="text-[13px] font-bold text-text-main">${b.treatmentName}</p>
            <p class="text-[11px] text-text-muted">${b.clinicName} • ${b.timeLabel}</p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick='reopenBooking(${JSON.stringify(b)})' class="px-3 py-1.5 rounded-xl bg-primary-subtle text-primary font-bold text-[12px] hover:bg-primary hover:text-white transition-colors cursor-pointer">View Pass</button>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="pt-4 border-t border-border-subtle flex items-center justify-between">
      ${bookings.length > 0 ? `
        <button onclick="clearAllAppointments()" class="text-[12px] text-secondary hover:underline cursor-pointer">Clear History</button>
      ` : '<div></div>'}
      <button onclick="closeGenericModal()" class="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-[13px] cursor-pointer">Close</button>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}
window.openMyAppointmentsModal = openMyAppointmentsModal;

function reopenBooking(b) {
  latestBooking = b;
  closeGenericModal();
  openReceiptModal(b);
}
window.reopenBooking = reopenBooking;

function clearAllAppointments() {
  if (confirm('Are you sure you want to clear your local appointment history?')) {
    localStorage.removeItem('cymor_appointments');
    openMyAppointmentsModal();
    showToast('Appointment history cleared');
  }
}
window.clearAllAppointments = clearAllAppointments;

// 11. SCROLL REVEAL INTERSECTION OBSERVER ANIMATIONS
function initScrollReveal() {
  document.body.classList.add('js-reveal');
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-text');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.05,
      rootMargin: '50px 0px -20px 0px'
    });

    revealElements.forEach(el => {
      // If element is already in the viewport on page load, activate immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('reveal-active');
      } else {
        observer.observe(el);
      }
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('reveal-active'));
  }
}

// 12. VIDEO TOUR MODAL HANDLERS
function openVideoModal() {
  const modal = document.getElementById('video-tour-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}
window.openVideoModal = openVideoModal;

function closeVideoModal() {
  const modal = document.getElementById('video-tour-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}
window.closeVideoModal = closeVideoModal;

// 13. FLOATING AMBIENT PARTICLES & HEALTH CROSSES (+) ANIMATION
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = Math.min(50, Math.floor(window.innerWidth / 26));

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Clinic Color Palette: Primary Teal, Vibrant Cyan, Emerald Mint, Soft Ruby Accent
  const colors = [
    'rgba(0, 102, 108, 0.28)',    // Primary Clinic Teal
    'rgba(0, 168, 181, 0.28)',    // Vibrant Cyan
    'rgba(13, 148, 136, 0.24)',   // Emerald Mint
    'rgba(14, 165, 233, 0.22)',   // Sky Blue
    'rgba(186, 2, 34, 0.16)'      // Clinic Red Medical Accent
  ];

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 15;
      this.radius = Math.random() * 2.5 + 1.5;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = -(Math.random() * 0.45 + 0.25); // Slow upward float
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.5 + 0.35;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.pulseAngle = Math.random() * Math.PI * 2;
      this.shape = Math.random() > 0.35 ? 'cross' : 'circle'; // 65% are medical health '+' crosses
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.008; // Gentle rotation for health crosses
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulseAngle += this.pulseSpeed;
      this.rotation += this.rotSpeed;

      // Wrap or reset if particle leaves canvas
      if (this.y < -20) this.y = height + 15;
      if (this.x < -20) this.x = width + 15;
      if (this.x > width + 20) this.x = -15;
    }

    draw() {
      const pulseFactor = Math.sin(this.pulseAngle) * 0.4;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;

      if (this.shape === 'cross') {
        // Draw Medical Health Cross (+) with smooth proportions
        const size = Math.max(7, this.radius * 4.5 + pulseFactor * 2);
        const thickness = Math.max(2.2, size * 0.32);

        // Horizontal arm
        if (ctx.roundRect) {
          ctx.beginPath();
          ctx.roundRect(-size / 2, -thickness / 2, size, thickness, 2);
          ctx.fill();

          // Vertical arm
          ctx.beginPath();
          ctx.roundRect(-thickness / 2, -size / 2, thickness, size, 2);
          ctx.fill();
        } else {
          ctx.fillRect(-size / 2, -thickness / 2, size, thickness);
          ctx.fillRect(-thickness / 2, -size / 2, thickness, size);
        }
      } else {
        // Soft ambient glowing circle
        const currentRadius = Math.max(1, this.radius + pulseFactor);
        ctx.beginPath();
        ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // Populate particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Subtle proximity connecting lines between nearby elements
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 102, 108, ${0.07 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // Update and draw each particle
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// 14. NUMBER COUNTER ANIMATION (Smooth count up on scroll)
function initNumberCounters() {
  const counterElements = document.querySelectorAll('[data-counter]');
  if (!counterElements.length) return;

  const countUp = (el) => {
    const target = parseFloat(el.getAttribute('data-counter'));
    const isYear = target > 1900;
    const startValue = isYear ? 1990 : 0;
    const duration = 1800; // ms
    const startTime = performance.now();
    const originalText = el.textContent;
    const suffix = originalText.replace(/^[0-9.]+/, '') || '';

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(startValue + (target - startValue) * easeOut);

      el.textContent = currentVal + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(updateCounter);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    counterElements.forEach(el => observer.observe(el));
  } else {
    counterElements.forEach(el => countUp(el));
  }
}


