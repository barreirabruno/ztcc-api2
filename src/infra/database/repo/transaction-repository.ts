import { Injectable } from "@nestjs/common";
import { Connection } from "typeorm";
import { BankTransactionObject } from "../entities/bank-transaction-object.entity";

@Injectable()
export class TransactionRepository {
  constructor(
    private connection: Connection
  ) {}

  async executeBankTransaction(transaction: any): Promise<BankTransactionObject[]>  {
    const newTransaction = this.connection.getRepository(BankTransactionObject).create(transaction)
    const queryRunner = this.connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      await queryRunner.manager.save(newTransaction)
      await queryRunner.commitTransaction()
      return newTransaction
    } catch (error) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }
}