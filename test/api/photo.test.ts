import axios from "axios";
jest.mock("axios");

describe("API Test: Photos", () => {
  const mockPhotos = [
    {
      albumId: 1,
      id: 1,
      title: "Photo 1",
      url: "https://via.placeholder.com/600/92c952",
      thumbnailUrl: "https://via.placeholder.com/150/92c952",
    },
    {
      albumId: 1,
      id: 2,
      title: "Photo 2",
      url: "https://via.placeholder.com/600/771796",
      thumbnailUrl: "https://via.placeholder.com/150/771796",
    },
  ];

  it("Trả về danh sách photos đúng định dạng", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      status: 200,
      data: mockPhotos,
    });

    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/photos"
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
    expect(response.data[0]).toHaveProperty("id");
    expect(response.data[0]).toHaveProperty("title");
    expect(response.data[0]).toHaveProperty("url");
    expect(response.data[0]).toHaveProperty("thumbnailUrl");
  });

  it("Trả về danh sách rỗng khi không có photo", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      status: 200,
      data: [],
    });

    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/photos"
    );

    expect(response.status).toBe(200);
    expect(response.data).toEqual([]);
  });

  it("Xử lý lỗi 500 từ server", async () => {
    (axios.get as jest.Mock).mockRejectedValue({
      response: { status: 500, statusText: "Internal Server Error" },
    });

    try {
      await axios.get("https://jsonplaceholder.typicode.com/photos");
    } catch (error: any) {
      expect(error.response.status).toBe(500);
      expect(error.response.statusText).toBe("Internal Server Error");
    }
  });

  it("Xử lý lỗi mạng", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Network Error"));

    try {
      await axios.get("https://jsonplaceholder.typicode.com/photos");
    } catch (error: any) {
      expect(error.message).toBe("Network Error");
    }
  });
});
