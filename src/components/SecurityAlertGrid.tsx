import { AlertGridCard } from '@/components/AlertGridCard';
import { formatAlertTime } from '@/lib/formatTime';

type SecurityAlert = {
  _id: string;
  camera_id: string;
  logged_at: string;
  image_id: string;
  violation_type?: string;
  zone?: string;
};

type SecurityAlertGridProps = {
  featureId: string;
  alerts: SecurityAlert[];
  onResolve: (id: string, data: SecurityAlert, type: string) => void;
};

export function SecurityAlertGrid({
  featureId,
  alerts,
  onResolve,
}: SecurityAlertGridProps) {
  if (alerts.length === 0) {
    return (
      <p className='col-span-full text-center text-sm text-guardai-gray py-6'>
        No active alerts
      </p>
    );
  }

  return (
    <>
      {alerts.map((item) => {
        if (featureId === 'perimeter-security') {
          return (
            <AlertGridCard
              key={item._id}
              alertType='Unauthorized Entry'
              location={item.zone || 'Perimeter'}
              cameraId={item.camera_id}
              time={formatAlertTime(item.logged_at)}
              imageId={item.image_id}
              onResolve={() => onResolve(item._id, item, 'unauthorized_entry')}
            />
          );
        }
        if (featureId === 'restricted-access') {
          return (
            <AlertGridCard
              key={item._id}
              alertType={item.violation_type || 'Restricted Access'}
              location={item.zone || 'Restricted Zone'}
              cameraId={item.camera_id}
              time={formatAlertTime(item.logged_at)}
              imageId={item.image_id}
              onResolve={() => onResolve(item._id, item, 'restricted')}
            />
          );
        }
        return (
          <AlertGridCard
            key={item._id}
            alertType={item.violation_type || 'Fire & Smoke'}
            location={item.zone || 'Perimeter'}
            cameraId={item.camera_id}
            time={formatAlertTime(item.logged_at)}
            imageId={item.image_id}
            onResolve={() => onResolve(item._id, item, 'fire_smoke')}
          />
        );
      })}
    </>
  );
}
