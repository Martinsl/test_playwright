import { Either, isRight, unwrapEither, makeRight, makeLeft } from './either';

export type EnvError = 'NOT_FOUND';

/**
 * Returns either env value for variable `PL_TEST_${ name }` or Left<'NOT_FOUND'>
 * 
 * @param name 
 * @returns Either<EnvError, string>
 */
export const getEnv = function (name: string): Either<EnvError, string>  {
  const envValue = process.env[`PL_TEST_${ name }`];

  return envValue !== undefined ? makeRight(envValue) : makeLeft('NOT_FOUND');
}

/**
 * Checks env variables for json encoded data and return it's data as an array
 * or empty if it does not exists
 *
 * @returns string[]
 */
export const getArrayFromEnv = function (envLabel): string[] {
  const headingEnv = getEnv(envLabel);
  let headings;

  if (isRight(headingEnv)) {
      headings = unwrapEither(headingEnv);
  } else {
      headings = [];
  }

  return JSON.parse(headings);
}
