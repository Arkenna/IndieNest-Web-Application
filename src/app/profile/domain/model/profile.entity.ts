import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class Profile implements BaseEntity {
  id: number;
  description: string;
  creationDate: Date;
  image: string;
  accountId: number;
  portfolioId: number | null;
  groupProjectIds: number[] | null;

  constructor(profile: {
    id: number;
    description: string;
    creationDate: Date | string;
    image: string;
    accountId: number;
    portfolioId: number | null;
    groupProjectIds: number[] | null;
  }) {
    this.id = profile.id;
    this.description = profile.description;
    this.creationDate = typeof profile.creationDate === 'string'
      ? new Date(profile.creationDate)
      : profile.creationDate;
    this.image = profile.image;
    this.accountId = profile.accountId;
    this.portfolioId = profile.portfolioId;
    this.groupProjectIds = profile.groupProjectIds;
  }
}
