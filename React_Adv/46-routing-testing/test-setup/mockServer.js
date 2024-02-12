import { http } from "msw";
import { setupServer } from "msw/node";

export const mockServer = setupServer();

export function addMockAPIRouteHandler(type, path, callback) {
	mockServer.use(http[type](new URL(path, import.meta.env.VITE_API_URL).href, callback));
}
