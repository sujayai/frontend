document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const statusEl = document.getElementById("status");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const key = fd.get("key"); fd.delete("key");
    try{
      const res = await fetch("/api/posts", { method: "POST", headers: { "x-admin-key": key }, body: fd });
      const j = await res.json().catch(()=>({}));
      statusEl.textContent = res.ok ? `Published: /p/${j.slug}` : (j.error || "error");
      if (res.ok) form.reset();
    }catch(_){
      statusEl.textContent = "network_error";
    }
  });
});
