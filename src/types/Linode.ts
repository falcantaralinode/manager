namespace Linode {
  export interface Linode {
    id: number;
    alerts: LinodeAlerts;
    backups: LinodeBackups;
    created: string;
    region: string;
    image: string;
    group?: string;
    ipv4: string[];
    ipv6: string;
    label: string;
    type: string;
    status: LinodeStatus;
    updated: string;
    hypervisor: Hypervisor;
    specs: LinodeSpecs;
  }

  export interface EnhancedLinode extends Linode.Linode {
    recentEvent?: Linode.Event;
    notification?: string;
  }

  export interface LinodeAlerts {
    cpu: number;
    io: number;
    network_in: number;
    network_out: number;
    transfer_quota: number;
  }

  export interface LinodeBackups {
    enabled: boolean;
    schedule: LinodeBackupSchedule;
    last_backup?: LinodeBackup;
    snapshot?: LinodeBackup;
  }

  export interface LinodeBackupSchedule {
    window: string;
    day: string;
  }

  export interface LinodeBackupsResponse {
    automatic: LinodeBackup[];
    snapshot: {
      current: LinodeBackup,
      in_progress: LinodeBackup,
    };
  }

  export interface LinodeBackup {
    id: number;
    label: string;
    status: LinodeBackupStatus;
    type: LinodeBackupType;
    region: string;
    created: string;
    updated: string;
    finished: string;
    configs: string[];
    disks: Disk[];
    /**
     * @todo Waiting on API to clarify as this is documented as an ENUM.
     */
    availability: string;
  }

  type LinodeBackupType = 'auto' | 'snapshot';

  type LinodeBackupStatus =
    'pending'
    | 'running'
    | 'needsPostProcessing'
    | 'successful'
    | 'failed'
    | 'userAborted';


  export type LinodeStatus =
    'offline'
    | 'booting'
    | 'running'
    | 'shutting_down'
    | 'rebooting'
    | 'provisioning'
    | 'deleting'
    | 'migrating';

  export interface Config {
    id: number;
    kernel: string;
    comments: string;
    memory_limit: number;
    root_device_ro: boolean;
    run_level: 'default' | 'single' | 'binbash';
    virt_mode: 'paravirt' | 'fullvirt';
    helpers: any;
    label: any;
    devices: Devices;
  }

  export interface DiskDevice {
    disk_id: null | number;
  }
  export interface VolumeDevice {
    volume_id: null | number;
  }

  export interface Devices {
    sda: null | DiskDevice | VolumeDevice;
    sdb: null | DiskDevice | VolumeDevice;
    sdc: null | DiskDevice | VolumeDevice;
    sdd: null | DiskDevice | VolumeDevice;
    sde: null | DiskDevice | VolumeDevice;
    sdf: null | DiskDevice | VolumeDevice;
    sdg: null | DiskDevice | VolumeDevice;
    sdh: null | DiskDevice | VolumeDevice;
  }
}
