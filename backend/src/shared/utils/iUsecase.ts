export interface UseCase<Input, Output> {
  exec(input: Input): Output | Promise<Output>;
}
