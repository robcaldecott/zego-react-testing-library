import "whatwg-fetch";
import { vi, expect, beforeAll, afterEach } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { setLogger } from "react-query";

expect.extend(matchers);

beforeAll(() => {
  setLogger({
    error: () => vi.fn(),
    log: (...args) => console.log(...args),
    warn: (...args) => console.log(...args),
  });
});

afterEach(cleanup);
