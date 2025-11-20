import { Cone } from '../entities/Cone';
import { ShapeException } from '../exceptions/ShapeException';
import logger from '../utils/logger';

export class ConeService {
  private static readonly EPSILON = 1e-10;

  /**
   * S = π × r × (r + l)
   */
  calculateSurfaceArea(cone: Cone): number {
    const r = cone.getRadius();
    const l = cone.getSlantHeight();
    const surfaceArea = Math.PI * r * (r + l);

    logger.debug({
      coneId: cone.id,
      radius: r,
      slantHeight: l,
      surfaceArea,
    }, 'Calculated cone surface area');

    return surfaceArea;
  }

  /**
   * V = (1/3) × π × r² × h
   */
  calculateVolume(cone: Cone): number {
    const r = cone.getRadius();
    const h = cone.getHeight();
    const volume = (1 / 3) * Math.PI * r * r * h;

    logger.debug({
      coneId: cone.id,
      radius: r,
      height: h,
      volume,
    }, 'Calculated cone volume');

    return volume;
  }

  calculateVolumeRatioByPlane(cone: Cone, plane: 'XY' | 'XZ' | 'YZ'): {
    ratio: number;
    upperVolume: number;
    lowerVolume: number;
    cutHeight: number;
  } | null {
    const apex = cone.getApex();
    const baseCenter = cone.getBaseCenter();
    const totalHeight = cone.getHeight();

    let cutHeight: number;

    switch (plane) {
      case 'XY':
        cutHeight = this.calculateCutHeightForPlane(apex.z, baseCenter.z);
        break;
      case 'XZ':
        cutHeight = this.calculateCutHeightForPlane(apex.y, baseCenter.y);
        break;
      case 'YZ':
        cutHeight = this.calculateCutHeightForPlane(apex.x, baseCenter.x);
        break;
      default:
        throw new ShapeException('Invalid plane', cone.id);
    }

    if (cutHeight <= 0 || cutHeight >= totalHeight) {
      logger.debug({
        coneId: cone.id,
        plane,
        cutHeight,
        totalHeight,
      }, 'Plane does not intersect cone');
      return null;
    }

    const radiusAtCut = cone.getRadius() * (1 - cutHeight / totalHeight);
    const lowerVolume = ((1 / 3) * Math.PI * cone.getRadius() * cone.getRadius()) * cutHeight;
    const upperHeight = totalHeight - cutHeight;
    const upperVolume = ((1 / 3) * Math.PI * radiusAtCut * radiusAtCut) * upperHeight;
    const ratio = lowerVolume / upperVolume;

    logger.debug({
      coneId: cone.id,
      plane,
      cutHeight,
      totalHeight,
      lowerVolume,
      upperVolume,
      ratio,
    }, 'Calculated volume ratio for plane cut');

    return {
      ratio,
      upperVolume,
      lowerVolume,
      cutHeight,
    };
  }

  isValidCone(cone: Cone): boolean {
    try {
      const radius = cone.getRadius();
      const height = cone.getHeight();
      const apex = cone.getApex();
      const baseCenter = cone.getBaseCenter();

      if (radius <= 0) {
        logger.warn({ coneId: cone.id, radius }, 'Invalid radius');
        return false;
      }

      if (height <= 0) {
        logger.warn({ coneId: cone.id, height }, 'Invalid height');
        return false;
      }

      if (apex.equals(baseCenter, ConeService.EPSILON)) {
        logger.warn({ coneId: cone.id }, 'Apex equals base center');
        return false;
      }

      logger.debug({ coneId: cone.id }, 'Cone is valid');
      return true;
    } catch (error) {
      logger.error({ err: error, coneId: cone.id }, 'Error validating cone');
      return false;
    }
  }

  isBaseOnCoordinatePlane(cone: Cone): {
    isOnPlane: boolean;
    plane?: 'XY' | 'XZ' | 'YZ';
  } {
    const baseCenter = cone.getBaseCenter();

    if (Math.abs(baseCenter.z) < ConeService.EPSILON) {
      return { isOnPlane: true, plane: 'XY' };
    }

    if (Math.abs(baseCenter.y) < ConeService.EPSILON) {
      return { isOnPlane: true, plane: 'XZ' };
    }

    if (Math.abs(baseCenter.x) < ConeService.EPSILON) {
      return { isOnPlane: true, plane: 'YZ' };
    }

    return { isOnPlane: false };
  }

  getCharacteristics(cone: Cone): {
    surfaceArea: number;
    volume: number;
    height: number;
    radius: number;
    slantHeight: number;
    isValid: boolean;
    baseOnPlane: { isOnPlane: boolean; plane?: 'XY' | 'XZ' | 'YZ' };
  } {
    return {
      surfaceArea: this.calculateSurfaceArea(cone),
      volume: this.calculateVolume(cone),
      height: cone.getHeight(),
      radius: cone.getRadius(),
      slantHeight: cone.getSlantHeight(),
      isValid: this.isValidCone(cone),
      baseOnPlane: this.isBaseOnCoordinatePlane(cone),
    };
  }

  private calculateCutHeightForPlane(
    apexCoord: number,
    baseCenterCoord: number,
  ): number {
    if (apexCoord * baseCenterCoord < 0) {
      const totalDiff = Math.abs(apexCoord - baseCenterCoord);
      const cutHeight = (Math.abs(baseCenterCoord) / totalDiff)
        * Math.sqrt(
          (apexCoord - baseCenterCoord) ** 2,
        );
      return cutHeight;
    }

    return -1;
  }
}
