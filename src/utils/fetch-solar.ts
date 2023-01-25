const url = '/api';
const demoData = false;
export const refreshSpeed = 2000;

function getRandomArbitrary(min:number, max:number) {
  return Math.random() * (max - min) + min;
}

export const fetchFlowData = async () => {
  if (demoData) {
    const PV = getRandomArbitrary(2000, 4500);
    const Load = -getRandomArbitrary(2000, 4500);;
    const Grid = -Load - PV;
    return {
      success: true,
      error: "",
      currentPower: PV,
      currentGrid: Grid, // minus value = export
      currentLoad: Load, //  minus value = consume
      currentSC: 87,
      currentBattery: getRandomArbitrary(30,35),
      hasBattery: true,
      currentAutonomy: PV / Load * 100,
    };
  }
  try {    
    const response = await fetch(url, {
      method: "GET",
    });
    const json = await response.json();
    if (!json.Body) {
      return { success: false, error: "missing body" };
    } else {
      const { P_PV, P_Grid, P_Load, rel_SelfConsumption, rel_Autonomy, P_Akku } = json.Body.Data.Site;
      return {
        success: true,
        error: "",
        currentPower: P_PV === null ? 0 : P_PV,
        currentGrid: P_Grid === null ? 0 : P_Grid,
        currentLoad: P_Load === null ? 0 : P_Load,
        currentBattery: P_Akku === null ? 0 : P_Akku,
        hasBattery: P_Akku !== null,
        currentSC: rel_SelfConsumption === null ? 0 : rel_SelfConsumption,
        currentAutonomy: rel_Autonomy === null ? 0 : rel_Autonomy,
      };
    }
  } catch (error) {
    return { success: false, error: error };
  }
};
