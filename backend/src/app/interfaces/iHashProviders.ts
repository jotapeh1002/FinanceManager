export abstract class IHashProviders {
  abstract hash(password: string): Promise<string>;
  abstract compare(password: string, passwordCripto: string): Promise<boolean>;
}
