import { extractPdfText } from "../js/pdf-extract.js";

const el = (id) => document.getElementById(id);

let selectedFile = null;
let settings = null;

function scoreClass(score) {
  if (score >= 75) return "score-good";
  if (score >= 50) return "score-warn";
  return "score-bad";
}

function setStatus(message, isError = false) {
  const statusEl = el("status");
  statusEl.textContent = message;
  statusEl.classList.toggle("hidden", !message);
  statusEl.style.color = isError ? "var(--danger)" : "var(--muted)";
}

function updateProviderVisibility() {
  const provider = el("provider").value;
  el("anthropicSettings").classList.toggle("hidden", provider !== "anthropic");
  el("openaiSettings").classList.toggle("hidden", provider !== "openai");
}

async function populateSettingsForm() {
  settings = await loadSettings();
  el("provider").value = settings.provider;
  el("anthropicKey").value = settings.anthropicKey;
  el("anthropicModel").value = settings.anthropicModel;
  el("openaiKey").value = settings.openaiKey;
  el("openaiModel").value = settings.openaiModel;
  el("region").value = settings.region;
  el("techStack").value = settings.techStack;
  updateProviderVisibility();
}

async function handleSaveSettings() {
  const partial = {
    provider: el("provider").value,
    anthropicKey: el("anthropicKey").value.trim(),
    anthropicModel: el("anthropicModel").value,
    openaiKey: el("openaiKey").value.trim(),
    openaiModel: el("openaiModel").value,
    region: el("region").value,
    techStack: el("techStack").value,
  };
  await saveSettings(partial);
  settings = { ...settings, ...partial };
  const confirmEl = el("saveConfirm");
  confirmEl.classList.remove("hidden");
  setTimeout(() => confirmEl.classList.add("hidden"), 1500);
}

function handleFileSelected(file) {
  if (!file || file.type !== "application/pdf") {
    setStatus("Please select a PDF file.", true);
    return;
  }
  selectedFile = file;
  el("fileName").textContent = `Selected: ${file.name}`;
  el("fileName").classList.remove("hidden");
  el("analyzeBtn").disabled = false;
  setStatus("");
}

function renderResults(result) {
  el("scores").innerHTML = `
    <div class="score-tile"><div class="value ${scoreClass(result.overall_score)}">${result.overall_score}</div><div class="label">Overall</div></div>
    <div class="score-tile"><div class="value ${scoreClass(result.ats_score)}">${result.ats_score}</div><div class="label">ATS</div></div>
    <div class="score-tile"><div class="value ${scoreClass(result.recruiter_score)}">${result.recruiter_score}</div><div class="label">Recruiter</div></div>
  `;

  el("summary").textContent = result.summary;

  el("rewrittenHeadline").innerHTML = result.rewritten_headline
    ? `<label>Suggested Headline</label><div class="box">${escapeHtml(result.rewritten_headline)}</div>`
    : "";

  el("sections").innerHTML = result.sections
    .map(
      (s) => `
      <div class="section-card">
        <h3>${escapeHtml(s.name)}</h3>
        ${listBlock("Strengths", s.strengths, "strengths")}
        ${listBlock("Issues", s.issues, "issues")}
        ${listBlock("Suggestions", s.suggestions, "suggestions")}
      </div>`
    )
    .join("");

  el("missingKeywords").innerHTML = result.missing_keywords?.length
    ? `<label>Missing Keywords</label>${result.missing_keywords.map((k) => `<span class="keyword-chip">${escapeHtml(k)}</span>`).join("")}`
    : "";

  el("resultsPanel").classList.remove("hidden");
}

function listBlock(title, items, cls) {
  if (!items || items.length === 0) return "";
  return `<div class="${cls}"><strong>${title}:</strong><ul>${items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul></div>`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

async function handleAnalyze() {
  if (!selectedFile) return;
  el("analyzeBtn").disabled = true;
  el("resultsPanel").classList.add("hidden");
  try {
    setStatus("Extracting text from PDF...");
    const profileText = await extractPdfText(selectedFile);
    if (!profileText || profileText.length < 50) {
      throw new Error("Couldn't extract enough text from this PDF. Make sure it's your LinkedIn 'Save to PDF' export.");
    }

    setStatus("Analyzing with AI... this can take a few seconds.");
    const result = await analyzeProfile(settings, profileText);

    setStatus("");
    renderResults(result);
  } catch (err) {
    console.error(err);
    setStatus(err.message || "Something went wrong.", true);
  } finally {
    el("analyzeBtn").disabled = !selectedFile;
  }
}

function initUploadArea() {
  const area = el("uploadArea");
  const input = el("pdfInput");

  area.addEventListener("click", () => input.click());
  input.addEventListener("change", () => handleFileSelected(input.files[0]));

  area.addEventListener("dragover", (e) => {
    e.preventDefault();
    area.classList.add("dragover");
  });
  area.addEventListener("dragleave", () => area.classList.remove("dragover"));
  area.addEventListener("drop", (e) => {
    e.preventDefault();
    area.classList.remove("dragover");
    handleFileSelected(e.dataTransfer.files[0]);
  });
}

async function init() {
  await populateSettingsForm();
  initUploadArea();

  el("settingsToggle").addEventListener("click", () => el("settingsPanel").classList.toggle("hidden"));
  el("provider").addEventListener("change", updateProviderVisibility);
  el("saveSettings").addEventListener("click", handleSaveSettings);
  el("analyzeBtn").addEventListener("click", handleAnalyze);

  const hasAnyKey = settings.anthropicKey || settings.openaiKey;
  if (!hasAnyKey) {
    el("settingsPanel").classList.remove("hidden");
  }
}

init();
