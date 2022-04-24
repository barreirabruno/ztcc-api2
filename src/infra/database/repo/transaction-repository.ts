import { Injectable } from "@nestjs/common";
import { Connection } from "typeorm";
import { BankTransactionObject } from "../entities/bank-transaction-object.entity";

@Injectable()
export class TransactionRepository {
  constructor(
    private connection: Connection
  ) {}

  async executeBankTransaction(transaction: any) {
    const newTransaction = this.connection.getRepository(BankTransactionObject).create(transaction)
    const queryRunner = this.connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      await queryRunner.manager.save(newTransaction)
      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }
}