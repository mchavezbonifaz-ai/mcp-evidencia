const base = process.env.MCP_URL;

if (!base) {
  console.error("Falta MCP_URL. Ejemplo:");
  console.error("MCP_URL=https://tu-dominio.vercel.app/mcp npm run test:mcp");
  process.exit(1);
}

const response = await fetch(base, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "accept": "application/json, text/event-stream"
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2025-06-18",
      capabilities: {},
      clientInfo: {
        name: "mcp-evidencia-test",
        version: "1.0.0"
      }
    }
  })
});

console.log("HTTP:", response.status);
console.log("Content-Type:", response.headers.get("content-type"));
console.log(await response.text());