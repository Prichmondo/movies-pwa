import { IResponse, getErrorResponse, getSuccessResponse } from "../domain/IResponse";
import Athena from 'aws-sdk/clients/athena';
import AWS from 'aws-sdk';
import { QueryExecutionId } from "aws-sdk/clients/athena";

const athena = new Athena();

async function checkExecution(queryExecutionId:QueryExecutionId): Promise<IResponse<boolean>> {
  
  const result = await athena.getQueryExecution({
    QueryExecutionId: queryExecutionId
  }).promise();

  switch(result.QueryExecution?.Status?.State) {
    case 'SUCCEEDED':
      return getSuccessResponse(true);
    case 'FAILED':
      return getErrorResponse('FAILED', 'query has failed');
    case 'CANCELLED':
      return getErrorResponse('FAILED', 'query has been cancelled');
    default:
    case 'RUNNING':
    case 'QUEUED':
      return checkExecution(queryExecutionId);
  }
  
}

export async function searchMovies(): Promise<IResponse<any>> {
  
  const OutputLocation = 's3://pwa-movies-datasets/query-result';
  const QueryString = 'SELECT * FROM "movies-database"."movies" limit 10';
  const params: Athena.Types.StartQueryExecutionInput = {
    QueryString,
    ResultConfiguration:{
      OutputLocation
    },
    QueryExecutionContext: {
      Database: 'default'
    }
  }

  const execution = await athena.startQueryExecution(params).promise();

  if(execution.QueryExecutionId) {
    const executionSucceded = await checkExecution(execution.QueryExecutionId);
    if(executionSucceded.success) {
      const result = await athena.getQueryResults({
        QueryExecutionId: execution.QueryExecutionId
      }).promise();
      return getSuccessResponse(result);
    }
    return getErrorResponse('ExecutionFailed', 'query execution failed');
  } else {
    return getErrorResponse('ExecutionFailed', 'query execution failed');
  }
  

}