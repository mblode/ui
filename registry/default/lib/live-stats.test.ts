import { afterEach, describe, expect, it, vi } from "vitest";

import { getGitHubStars, getNpmDownloads } from "./live-stats";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getGitHubStars", () => {
  it("returns the stargazer count", async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ stargazers_count: 412 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(getGitHubStars("mblode/ui")).resolves.toBe(412);
    expect(fetchMock.mock.calls[0]?.[0]).toBe("https://api.github.com/repos/mblode/ui");
    expect(fetchMock.mock.calls[0]?.[1]).toMatchObject({ next: { revalidate: 86_400 } });
  });

  it("fails closed on a non-OK response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("rate limited", { status: 403 })),
    );

    await expect(getGitHubStars("mblode/ui")).resolves.toBeNull();
  });

  it("fails closed when the request throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    await expect(getGitHubStars("mblode/ui")).resolves.toBeNull();
  });

  it("fails closed on an unexpected shape", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ stargazers_count: "12" })));

    await expect(getGitHubStars("mblode/ui")).resolves.toBeNull();
  });

  it("rejects a malformed slug without fetching", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(getGitHubStars("../../users")).resolves.toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("getNpmDownloads", () => {
  it("returns the download count for the period", async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ downloads: 1200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(getNpmDownloads("blode-icons-react", "last-month")).resolves.toBe(1200);
    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      "https://api.npmjs.org/downloads/point/last-month/blode-icons-react",
    );
  });

  it("keeps the slash in a scoped package name", async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ downloads: 5 }));
    vi.stubGlobal("fetch", fetchMock);

    await getNpmDownloads("@blode/cli");
    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      "https://api.npmjs.org/downloads/point/last-week/@blode/cli",
    );
  });

  it("fails closed when the package is missing", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(Response.json({ error: "not found" }, { status: 404 })),
    );

    await expect(getNpmDownloads("does-not-exist")).resolves.toBeNull();
  });
});
