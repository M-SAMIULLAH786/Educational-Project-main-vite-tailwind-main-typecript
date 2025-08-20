type StoredUser = {
  name: string;
  email: string;
  token: string;
};

const SESSION_KEY = "APP_SESSION_V1";
const USERS_DB_KEY = "APP_USERS_DB_V1";

function wait(ms = 300) {
  return new Promise((res) => setTimeout(res, ms));
}

export function getCurrentUser(): StoredUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

export async function login(
  email: string,
  password: string
): Promise<StoredUser> {
  await wait();
  const dbRaw = localStorage.getItem(USERS_DB_KEY);
  const users: Array<{ name: string; email: string; password: string }> = dbRaw
    ? JSON.parse(dbRaw)
    : [];

  const found = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!found) {
    throw new Error("Wrong email or password");
  }

  const session: StoredUser = {
    name: found.name,
    email: found.email,
    token: "token_" + Math.random().toString(36).slice(2),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<StoredUser> {
  await wait();

  // ✅ Password validation (min 8 chars, at least one special char)
  const passwordRegex = /^(?=.*[^A-Za-z0-9]).{8,}$/;

  if (!name || !email || !password || !email.includes("@")) {
    throw new Error("Invalid registration data");
  }
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must be at least 8 characters and contain a special character"
    );
  }

  const dbRaw = localStorage.getItem(USERS_DB_KEY);
  const users: Array<{ name: string; email: string; password: string }> = dbRaw
    ? JSON.parse(dbRaw)
    : [];

  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("Account already exists");
  }

  users.push({ name, email, password });
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));

  const session: StoredUser = {
    name,
    email,
    token: "token_" + Math.random().toString(36).slice(2),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Create or find a user from an OAuth provider (Google) and create a session.
 * Used for social sign-ins where we only have name+email.
 */
export async function socialSignIn(
  name: string,
  email: string
): Promise<StoredUser> {
  await wait();
  if (!email) throw new Error("Missing email from provider");

  const dbRaw = localStorage.getItem(USERS_DB_KEY);
  const users: Array<{ name: string; email: string; password: string }> = dbRaw
    ? JSON.parse(dbRaw)
    : [];

  let found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!found) {
    // store a placeholder password for provider users
    const placeholderPassword = "__oauth_google__";
    found = {
      name: name || email.split("@")[0],
      email,
      password: placeholderPassword,
    };
    users.push(found);
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  }

  const session: StoredUser = {
    name: found.name,
    email: found.email,
    token: "token_" + Math.random().toString(36).slice(2),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}
