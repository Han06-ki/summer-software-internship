import './style.css';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App element was not found.');
}

app.innerHTML = `
  <header class="hero">
    <nav class="navbar">
      <h1>Summer Software Internship</h1>
      <button id="darkModeBtn" class="secondary-btn">Toggle dark mode</button>
    </nav>

    <div class="hero-content">
      <p class="tag">Week 1 Project</p>
      <h2>Building my first public internship website</h2>
      <p>
        This website shows what I am learning during my summer software internship.
        I built it with HTML, CSS, TypeScript, Vite, GitHub, and Vercel.
      </p>
      <a href="#project-log" class="main-btn">View my project log</a>
    </div>
  </header>

  <main>
    <section class="card">
      <h2>About Me</h2>
      <p>
        My name is James Ki. I am a Computer Science student learning how to build real
        web projects and deploy them online.
      </p>
    </section>

    <section class="card">
      <h2>What I Am Learning</h2>
      <ul id="learningList">
        <li>HTML gives a web page structure.</li>
        <li>CSS controls the design and layout.</li>
        <li>TypeScript adds interactive behavior.</li>
        <li>Git tracks changes in my code.</li>
        <li>GitHub stores my project online.</li>
        <li>Vercel deploys my site to the internet.</li>
        <li>The DOM lets TypeScript find and change parts of the page.</li>
      </ul>

      <div class="task-counter">
        <p>Completed learning tasks: <span id="taskCount">0</span></p>
        <button id="taskBtn" class="main-btn">Add completed task</button>
      </div>
    </section>

    <section class="card" id="project-log">
      <h2>Project Log</h2>
      <p>Use the form below to add a new project log entry.</p>

      <form id="logForm">
        <label for="logInput">New log entry</label>
        <input id="logInput" type="text" placeholder="Example: Styled the hero section" />
        <button type="submit" class="main-btn">Add entry</button>
      </form>

      <ul id="logList">
        <li>Created the Vite TypeScript project.</li>
        <li>Removed starter content and planned my homepage sections.</li>
        <li>Added HTML sections for the internship website.</li>
      </ul>
    </section>

    <section class="card" id="tinyurl-section">
  <h2>TinyURL Frontend Prototype</h2>
  <p>
    Enter a long URL below and the app will create a fake shortened URL.
    This is frontend-only, so it does not actually redirect yet.
  </p>

  <form id="urlForm" novalidate>
    <label for="urlInput">Long URL</label>
    <input id="urlInput" type="url" placeholder="https://example.com" />
    <button type="submit" class="main-btn">Shorten</button>
  </form>

  <p id="urlError" class="message"></p>

  <div id="urlResult" class="result-box">
    <p>No shortened URL yet.</p>
  </div>

  <button id="copyUrlBtn" class="secondary-action" type="button">Copy short URL</button>
  <button id="clearHistoryBtn" class="secondary-action" type="button">Clear History</button>

  <h3>History</h3>
  <ul id="urlHistory">
    <li>No URLs shortened yet.</li>
  </ul>
</section>

    <section class="card">
      <h2>What I Learned This Week</h2>
      <p>
        I learned that websites are built in layers. HTML creates the structure, CSS makes
        it look better, and TypeScript makes it respond when a user clicks or types.
      </p>
    </section>

    <section class="card">
      <h2>Weekly Goal Validator</h2>
      <p>Type a weekly goal with at least 10 characters.</p>

      <form id="goalForm">
        <label for="goalInput">Weekly goal</label>
        <input id="goalInput" type="text" placeholder="Example: Deploy my website to Vercel" />
        <button type="submit" class="main-btn">Check goal</button>
      </form>

      <p id="goalMessage" class="message"></p>
    </section>
  </main>

  <footer>
    <p id="lastUpdated"></p>
  </footer>
`;

const darkModeBtn = document.querySelector<HTMLButtonElement>('#darkModeBtn');
const taskBtn = document.querySelector<HTMLButtonElement>('#taskBtn');
const taskCount = document.querySelector<HTMLSpanElement>('#taskCount');
const logForm = document.querySelector<HTMLFormElement>('#logForm');
const logInput = document.querySelector<HTMLInputElement>('#logInput');
const logList = document.querySelector<HTMLUListElement>('#logList');
const goalForm = document.querySelector<HTMLFormElement>('#goalForm');
const goalInput = document.querySelector<HTMLInputElement>('#goalInput');
const goalMessage = document.querySelector<HTMLParagraphElement>('#goalMessage');
const lastUpdated = document.querySelector<HTMLParagraphElement>('#lastUpdated');
const urlForm = document.querySelector<HTMLFormElement>('#urlForm');
const urlInput = document.querySelector<HTMLInputElement>('#urlInput');
const urlError = document.querySelector<HTMLParagraphElement>('#urlError');
const urlResult = document.querySelector<HTMLDivElement>('#urlResult');
const copyUrlBtn = document.querySelector<HTMLButtonElement>('#copyUrlBtn');
const clearHistoryBtn = document.querySelector<HTMLButtonElement>('#clearHistoryBtn');
const urlHistory = document.querySelector<HTMLUListElement>('#urlHistory');

type ShortenedUrl = {
  shortCode: string;
  longUrl: string;
  createdAt: string;
};

const urls: ShortenedUrl[] = [];

let latestShortCode = '';

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);

    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}


function generateShortCode(length: number = 6): string {
  const alphabet =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  let code = '';

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * alphabet.length);
    code += alphabet[index];
  }

  return code;
}

function renderHistory(): void {
  if (!urlHistory) return;

  urlHistory.innerHTML = '';

  if (urls.length === 0) {
    urlHistory.innerHTML = '<li>No URLs shortened yet.</li>';
    return;
  }

  urls.forEach((record) => {
    const item = document.createElement('li');

    item.textContent =
      `${record.longUrl} → https://tiny.fake/${record.shortCode}`;

    urlHistory.appendChild(item);
  });
}

let completedTasks = 0;

function updateTaskCount(): void {
  if (!taskCount) return;
  taskCount.textContent = completedTasks.toString();
}

function addLogEntry(entry: string): void {
  if (!logList) return;

  const newItem = document.createElement('li');
  newItem.textContent = entry;
  logList.appendChild(newItem);
}

function validateGoal(goal: string): string {
  if (goal.length < 10) {
    return 'Goal needs to be at least 10 characters long.';
  }

  return 'Nice goal. This is clear enough for Week 1.';
}

if (darkModeBtn) {
  darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
}

if (taskBtn) {
  taskBtn.addEventListener('click', () => {
    completedTasks += 1;
    updateTaskCount();
  });
}

if (logForm && logInput) {
  logForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const entry = logInput.value.trim();

    if (entry === '') {
      alert('Please type a project log entry first.');
      return;
    }

    addLogEntry(entry);
    logInput.value = '';
  });
}

if (urlForm && urlInput && urlError && urlResult) {
  urlForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const longUrl = urlInput.value.trim();

    if (!isValidUrl(longUrl)) {
      urlError.textContent =
        'Please enter a valid URL starting with http:// or https://';
      return;
    }

    urlError.textContent = '';

    const shortCode = generateShortCode();

    const record: ShortenedUrl = {
      shortCode,
      longUrl,
      createdAt: new Date().toISOString(),
    };

  urls.push(record);
latestShortCode = shortCode;

const shortUrl = `https://tiny.fake/${shortCode}`;

urlResult.innerHTML = `
  <p><strong>Short URL:</strong> ${shortUrl}</p>
  <p><strong>Original URL:</strong> ${longUrl}</p>
`;
    urlInput.value = '';

    renderHistory();
  });
}

if (copyUrlBtn) {
  copyUrlBtn.addEventListener('click', async () => {
    if (!latestShortCode) {
      alert('No short URL to copy yet.');
      return;
    }

    const foundUrl = urls.find((url) => url.shortCode === latestShortCode);

    if (!foundUrl) {
      alert('Could not find the latest short URL.');
      return;
    }

    const shortUrl = `https://tiny.fake/${foundUrl.shortCode}`;

    await navigator.clipboard.writeText(shortUrl);

    alert('Short URL copied.');
  });
}

if (clearHistoryBtn && urlResult && urlError) {
  clearHistoryBtn.addEventListener('click', () => {
    urls.length = 0;
    latestShortCode = '';

    urlError.textContent = '';

    urlResult.innerHTML = `
      <p>No shortened URL yet.</p>
    `;

    renderHistory();
  });
}

if (goalForm && goalInput && goalMessage) {
  goalForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const result = validateGoal(goalInput.value.trim());
    goalMessage.textContent = result;
  });
}

if (lastUpdated) {
  lastUpdated.textContent = `Last updated: ${new Date().toLocaleDateString()}`;
}

updateTaskCount();
