import type {
  IdleMachineryAlert,
  LoiteringAlert,
  PpeAlert,
  PhoneAlert,
  SecurityAlert,
  SleepAlert,
} from '@/types/dashboardAlerts';

function pickId(item: Record<string, unknown>) {
  return String(item._id ?? item.id ?? '');
}

export function mapIdleFromApi(items: unknown[]): IdleMachineryAlert[] {
  if (!Array.isArray(items) || items.length === 0) return [];
  return items.map((raw) => {
    const item = raw as Record<string, unknown>;
    return {
      _id: pickId(item),
      machine: String(item.machine ?? item.machine_name ?? item.name ?? '—'),
      camera_id: item.camera_id as string | undefined,
      roomName: (item.roomName ?? item.room_name ?? item.zone) as string | undefined,
      logged_at: String(item.logged_at ?? item.frame_timestamp ?? new Date().toISOString()),
      idle_duration: item.idle_duration as string | undefined,
      operator_present: item.operator_present as boolean | undefined,
      status: 'active',
    };
  });
}

export function mapLoiteringFromApi(items: unknown[]): LoiteringAlert[] {
  if (!Array.isArray(items) || items.length === 0) return [];
  return items.map((raw) => {
    const item = raw as Record<string, unknown>;
    return {
      _id: pickId(item),
      zone: (item.zone ?? item.roomName ?? item.room_name) as string | undefined,
      camera_id: item.camera_id as string | undefined,
      roomName: (item.roomName ?? item.room_name) as string | undefined,
      logged_at: String(item.logged_at ?? item.frame_timestamp ?? new Date().toISOString()),
      person_count: (item.person_count ?? item.box_count) as number | undefined,
      duration: item.duration as string | undefined,
      status: 'active',
    };
  });
}

export function mapPpeFromApi(items: unknown[]): PpeAlert[] {
  if (!Array.isArray(items) || items.length === 0) return [];
  return items.map((raw) => {
    const item = raw as Record<string, unknown>;
    return {
      _id: pickId(item),
      person_id: item.person_id as string | undefined,
      violation: String(item.violation ?? 'PPE violation'),
      camera_id: item.camera_id as string | undefined,
      roomName: (item.roomName ?? item.room_name) as string | undefined,
      logged_at: String(item.logged_at ?? item.frame_timestamp ?? new Date().toISOString()),
      status: 'active',
    };
  });
}

export function mapPhoneFromApi(items: unknown[]): PhoneAlert[] {
  if (!Array.isArray(items) || items.length === 0) return [];
  return items.map((raw) => {
    const item = raw as Record<string, unknown>;
    return {
      _id: pickId(item),
      person_id: item.person_id as string | undefined,
      camera_id: item.camera_id as string | undefined,
      roomName: (item.roomName ?? item.room_name) as string | undefined,
      logged_at: String(item.logged_at ?? item.frame_timestamp ?? new Date().toISOString()),
      duration: item.duration as string | undefined,
      status: 'active',
    };
  });
}

export function mapSleepFromApi(items: unknown[]): SleepAlert[] {
  if (!Array.isArray(items) || items.length === 0) return [];
  return items.map((raw) => {
    const item = raw as Record<string, unknown>;
    return {
      _id: pickId(item),
      person_id: item.person_id as string | undefined,
      camera_id: item.camera_id as string | undefined,
      roomName: (item.roomName ?? item.room_name) as string | undefined,
      logged_at: String(item.logged_at ?? item.frame_timestamp ?? new Date().toISOString()),
      duration: item.duration as string | undefined,
      status: 'active',
    };
  });
}

export function mapSecurityFromApi(items: unknown[]): SecurityAlert[] {
  if (!Array.isArray(items) || items.length === 0) return [];
  return items.map((raw) => {
    const item = raw as Record<string, unknown>;
    return {
      _id: pickId(item),
      camera_id: item.camera_id as string | undefined,
      roomName: (item.roomName ?? item.room_name) as string | undefined,
      logged_at: String(item.logged_at ?? item.frame_timestamp ?? new Date().toISOString()),
      violation_type: String(item.violation_type ?? item.violation ?? 'Security alert'),
      severity: (item.severity as SecurityAlert['severity']) ?? 'high',
      status: 'active',
    };
  });
}
