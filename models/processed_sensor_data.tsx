import * as SQLite from 'expo-sqlite';
import { insertSensorData, getSensorData, getSensorDataBySessionId } from '../database/db';

/**
 * Processed_Sensor_Data class representing sensor readings in the database
 * Maps to the Processed_Sensor_Data table in SQLite
 */
export class ProcessedSensorData {
  data_id: number | null;
  session_id: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  pH: number;
  moisture: number;
  temperature: number;

  constructor(
    session_id: number,
    nitrogen: number,
    phosphorus: number,
    potassium: number,
    pH: number,
    moisture: number,
    temperature: number,
    data_id: number | null = null
  ) {
    this.session_id = session_id;
    this.nitrogen = nitrogen;
    this.phosphorus = phosphorus;
    this.potassium = potassium;
    this.pH = pH;
    this.moisture = moisture;
    this.temperature = temperature;
    this.data_id = data_id;
  }

  /**
   * Calculate the NPK ratio (Nitrogen, Phosphorus, Potassium)
   *
   * @returns Object containing the NPK ratio values
   */
  getNPKRatio(): { n: number, p: number, k: number } {
    const total = this.nitrogen + this.phosphorus + this.potassium;
    
    if (total === 0) {
      return { n: 0, p: 0, k: 0 };
    }
    
    return {
      n: parseFloat((this.nitrogen / total * 100).toFixed(1)),
      p: parseFloat((this.phosphorus / total * 100).toFixed(1)),
      k: parseFloat((this.potassium / total * 100).toFixed(1))
    };
  }

  /**
   * Get soil health status based on sensor readings
   * 
   * @returns Object containing soil health assessment
   */
  getSoilHealthStatus(): {
    pHStatus: 'acidic' | 'neutral' | 'alkaline',
    moistureLevel: 'dry' | 'moderate' | 'wet',
    overallHealth: 'poor' | 'fair' | 'good' | 'excellent'
  } {
    // Determine pH status
    let pHStatus: 'acidic' | 'neutral' | 'alkaline';
    if (this.pH < 6.0) {
      pHStatus = 'acidic';
    } else if (this.pH > 7.5) {
      pHStatus = 'alkaline';
    } else {
      pHStatus = 'neutral';
    }
    
    // Determine moisture level
    let moistureLevel: 'dry' | 'moderate' | 'wet';
    if (this.moisture < 20) {
      moistureLevel = 'dry';
    } else if (this.moisture > 40) {
      moistureLevel = 'wet';
    } else {
      moistureLevel = 'moderate';
    }
    
    // Calculate a simple health score based on multiple factors
    let healthScore = 0;
    
    // pH factor (optimal range around 6.0-7.0)
    if (this.pH >= 6.0 && this.pH <= 7.0) {
      healthScore += 25;
    } else if (this.pH >= 5.5 && this.pH <= 7.5) {
      healthScore += 15;
    } else {
      healthScore += 5;
    }
    
    // NPK balance factor
    const npk = this.getNPKRatio();
    const npkBalance = Math.min(npk.n, npk.p, npk.k) / Math.max(npk.n, npk.p, npk.k);
    if (npkBalance > 0.7) healthScore += 25; // Well balanced
    else if (npkBalance > 0.4) healthScore += 15; // Moderately balanced
    else healthScore += 5; // Unbalanced
    
    // Moisture factor (optimal around 25-35%)
    if (this.moisture >= 25 && this.moisture <= 35) {
      healthScore += 25;
    } else if (this.moisture >= 15 && this.moisture <= 45) {
      healthScore += 15;
    } else {
      healthScore += 5;
    }
    
    // Temperature factor (optimal around 18-24°C for many plants)
    if (this.temperature >= 18 && this.temperature <= 24) {
      healthScore += 25;
    } else if (this.temperature >= 10 && this.temperature <= 30) {
      healthScore += 15;
    } else {
      healthScore += 5;
    }
    
    // Determine overall health based on score
    let overallHealth: 'poor' | 'fair' | 'good' | 'excellent';
    if (healthScore >= 85) {
      overallHealth = 'excellent';
    } else if (healthScore >= 65) {
      overallHealth = 'good';
    } else if (healthScore >= 40) {
      overallHealth = 'fair';
    } else {
      overallHealth = 'poor';
    }
    
    return {
      pHStatus,
      moistureLevel,
      overallHealth
    };
  }

  /**
   * Get recommendations based on sensor readings
   * 
   * @returns String with recommendations for soil improvement
   */
  getRecommendations(): string {
    const recommendations: string[] = [];
    
    // pH recommendations
    if (this.pH < 6.0) {
      recommendations.push("Consider adding lime or wood ash to raise soil pH.");
    } else if (this.pH > 7.5) {
      recommendations.push("Consider adding sulfur, peat moss, or organic matter to lower soil pH.");
    }
    
    // NPK recommendations
    if (this.nitrogen < 30) {
      recommendations.push("Nitrogen is low. Consider adding compost, blood meal, or nitrogen-rich fertilizer.");
    }
    
    if (this.phosphorus < 20) {
      recommendations.push("Phosphorus is low. Consider adding bone meal, rock phosphate, or phosphorus-rich fertilizer.");
    }
    
    if (this.potassium < 30) {
      recommendations.push("Potassium is low. Consider adding wood ash, banana peels, or potassium-rich fertilizer.");
    }
    
    // Moisture recommendations
    if (this.moisture < 20) {
      recommendations.push("Soil is dry. Increase watering frequency and consider adding organic matter to improve water retention.");
    } else if (this.moisture > 40) {
      recommendations.push("Soil is wet. Reduce watering and consider improving drainage.");
    }
    
    // Temperature advice if extreme
    if (this.temperature < 10) {
      recommendations.push("Soil temperature is low. Consider using mulch or row covers to warm the soil.");
    } else if (this.temperature > 30) {
      recommendations.push("Soil temperature is high. Consider adding mulch to regulate soil temperature.");
    }
    
    return recommendations.join(" ");
  }
}