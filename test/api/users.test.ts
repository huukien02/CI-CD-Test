import axios from "axios";

jest.mock("axios");

describe("API Test: Users", () => {
  const mockUsers = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Doe", email: "jane@example.com" },
  ];

  it("Trả về là 1 danh sách", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      status: 200,
      data: mockUsers,
    });

    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
    expect(response.data[0]).toHaveProperty("id");
    expect(response.data[0]).toHaveProperty("name");
    expect(response.data[0]).toHaveProperty("email");
  });

  it("Trả về rỗng nếu không có người dùng", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      status: 200,
      data: [],
    });

    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    expect(response.status).toBe(200);
    expect(response.data).toEqual([]);
  });

  it("Xử lý lỗi API", async () => {
    (axios.get as jest.Mock).mockRejectedValue({
      response: { status: 500, statusText: "Internal Server Error" },
    });

    try {
      await axios.get("https://jsonplaceholder.typicode.com/users");
    } catch (error: any) {
      expect(error.response.status).toBe(500);
      expect(error.response.statusText).toBe("Internal Server Error");
    }
  });

  it("Xử lý lỗi mạng", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Network Error"));

    try {
      await axios.get("https://jsonplaceholder.typicode.com/users");
    } catch (error: any) {
      expect(error.message).toBe("Network Error");
    }
  });
});
