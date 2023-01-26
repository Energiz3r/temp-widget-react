const url = "/api";
const demoData = false;
export const refreshSpeed = 2000;

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const fetchTempData = async () => {
  if (demoData) {
    return {
      success: true,
      error: "",
      temp: 25,
      humidity: 75,
    };
  }
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const json = await response.json();
    if (!json.temp || json.temp === "nan") {
      return { success: false, error: "missing temp values" };
    } else {
      const { temp, humidity } = json;
      return {
        success: true,
        error: "",
        temp,
        humidity,
      };
    }
  } catch (error) {
    return { success: false, error: error };
  }
};
