export interface ISupabaseResponse<Entity> {
  data: Entity | unknown | null;
  error: Error | unknown | null;
}