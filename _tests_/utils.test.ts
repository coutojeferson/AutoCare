import { getRemainingKm } from '../src/utils/getRemainingKm'
import { formatKm } from '../src/utils/formatKm'
import { formatDate } from '../src/utils/formatDate'
import { getNextOilChangeKm } from '../src/utils/getNextOilChangeKm'
import { getLatestOilChange } from '../src/utils/getLatestOilChange'
import { Maintenance } from '../src/types/maintenance'
import { getOilChangeMaintenances } from '../src/utils/getOilChangeMaintenances'
import { getMaintenanceStatus } from '../src/utils/getMaintenanceStatus'
import { getRemainingKmMessage } from '../src/utils/getRemainingKmMessage'
import { getVehicleIcon } from '../src/utils/getVehicleIcon'
import { getVehicleTypeLabel } from '../src/utils/getVehicleTypeLabel'
import { getMaintenanceStatusLabel } from '../src/utils/getMaintenanceStatusLabel'

describe('getRemainingKm', () => {
  it('should return the difference between nextKm and currentKm', () => {
    expect(getRemainingKm(10000, 8000)).toBe(2000)
  })

  it('should return a negative value if currentKm exceeded nextKm', () => {
    expect(getRemainingKm(8000, 10000)).toBe(-2000)
  })

  it('should return zero if both values are equal', () => {
    expect(getRemainingKm(5000, 5000)).toBe(0)
  })
})

describe('formatKm', () => {
  it('should format km in pt-BR locale', () => {
    expect(formatKm(10000)).toBe('10.000 km')
  })

  it('should format small values correctly', () => {
    expect(formatKm(500)).toBe('500 km')
  })
})

describe('formatDate', () => {
  it('should format an ISO date string correctly', () => {
    expect(formatDate('2024-01-15T12:00:00')).toBe('15/01/2024')
  })

  it('should return — when called with no arguments', () => {
    expect(formatDate()).toBe('—')
  })

  it('should format a date from a valid timestamp in id', () => {
    expect(formatDate(undefined, '1705320000000')).toBe('15/01/2024')
  })
})

describe('getNextOilChangeKm', () => {
  it('should return the next oil change km', () => {
    expect(getNextOilChangeKm({id: '1', vehicleId: '1', type: 'oil_change', createdAt: '2024-01-01', lastKm: 1000, intervalKm: 1000})).toBe(2000)
  })
})

describe('getOilChangeMaintenances', () => {
  it('should return the oil change maintenances sorted by lastKm in descending order', () => {
    const maintenances: Maintenance[] = [
      { id: '1', vehicleId: '1', type: 'oil_change', lastKm: 1000, intervalKm: 5000, createdAt: '2024-01-01' },
      { id: '2', vehicleId: '1', type: 'oil_change', lastKm: 3000, intervalKm: 5000, createdAt: '2024-02-01' },
      { id: '3', vehicleId: '1', type: 'oil_change', lastKm: 5000, intervalKm: 10000, createdAt: '2024-03-01' },
    ]
    expect(getOilChangeMaintenances(maintenances)).toEqual([maintenances[2], maintenances[1], maintenances[0]])
  })

  it('should return an empty array if there are no oil changes', () => {
    const maintenances: Maintenance[] = []
    expect(getOilChangeMaintenances(maintenances)).toEqual([])
  })

  it('should filter out non oil change maintenances', () => {
    const maintenances: Maintenance[] = [
      { id: '1', vehicleId: '1', type: 'oil_change', lastKm: 1000, intervalKm: 5000, createdAt: '2024-01-01' },
      { id: '2', vehicleId: '1', type: 'tire_rotation', lastKm: 3000, intervalKm: 5000, createdAt: '2024-02-01' },
    ]
    expect(getOilChangeMaintenances(maintenances)).toEqual([maintenances[0]])
  })
})

describe('getLatestOilChange', () => {
  it('should return the last oil change', () => {
    const maintenances: Maintenance[] = [
      { id: '1', vehicleId: '1', type: 'oil_change', lastKm: 1000, intervalKm: 5000, createdAt: '2024-01-01' },
      { id: '2', vehicleId: '1', type: 'oil_change', lastKm: 3000, intervalKm: 5000, createdAt: '2024-02-01' },
      { id: '3', vehicleId: '1', type: 'oil_change', lastKm: 5000, intervalKm: 10000, createdAt: '2024-03-01' },
    ]
    expect(getLatestOilChange(maintenances)).toEqual(maintenances[2])
  }
)

  it('should return undefined if there are no oil changes', () => {
    const maintenances: Maintenance[] = []
    expect(getLatestOilChange(maintenances)).toBeUndefined()
  })
})

describe('getMaintenanceStatus', () => {
  it('should return ok when remaining km is greater than 500', () => {
    expect(getMaintenanceStatus(1000)).toEqual({ status: 'ok', color: 'green' })
  })

  it('should return soon when remaining km is 500 or less', () => {
    expect(getMaintenanceStatus(500)).toEqual({ status: 'soon', color: '#F59E0B' })
  })

  it('should return overdue when remaining km is 0 or less', () => {
    expect(getMaintenanceStatus(0)).toEqual({ status: 'overdue', color: 'red' })
    expect(getMaintenanceStatus(-100)).toEqual({ status: 'overdue', color: 'red' })
  })
})

describe('getRemainingKmMessage', () => {
  it('should return the correct messsage for remaining km', () => {
    expect(getRemainingKmMessage(1000)).toBe('Faltam 1.000 km para a próxima troca')
  })
  it('should return the correct message for overdue', () => {
    expect(getRemainingKmMessage(0)).toBe('A troca de óleo está vencida')
    expect(getRemainingKmMessage(-100)).toBe('A troca de óleo está vencida')
  })
})

describe('getVehicleIcon', () => {
  it('should return the correct icon for car', () => {
    expect(getVehicleIcon('car')).toBe('car-side')
  })
  it('should return the correct icon for motorcycle', () => {
    expect(getVehicleIcon('motorcycle')).toBe('motorbike')
  })
})

describe('getVehicleTypeLabel', () => {
  it('should return the corret label for car', () => {
    expect(getVehicleTypeLabel('car')).toBe('Carro')
  })
  it('should return the correct label for motorcycle', () => {
    expect(getVehicleTypeLabel('motorcycle')).toBe('Moto')
  })
})

describe('getMaintenanceStatusLabel', () => {
  it('should return "Em dia" for ok status', () => {
    expect(getMaintenanceStatusLabel({status: 'ok', color: 'green'})).toBe('Em dia')
  })
  it('should return "Próximo da troca" for soon status', () => {
    expect(getMaintenanceStatusLabel({status: 'soon', color: '#F59E0B'})).toBe('Próximo da troca')
  })
  it('should return "Troca vencida" for overdue status', () => {
    expect(getMaintenanceStatusLabel({status: 'overdue', color: 'red'})).toBe('Troca vencida')
  })
})