import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class BankTransactionObject {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Generated("uuid")
  transactionId: string

  @Column()
  transactionObject: string

  @Column()
  currency: string

  @Column({ type: "numeric", precision: 10, scale: 2})
  value: number

  @Column()
  source: string

  @Column()
  destination: string

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}