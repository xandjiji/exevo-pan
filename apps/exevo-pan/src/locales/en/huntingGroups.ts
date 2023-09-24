export default {
  Meta: {
    title: 'Hunting Groups',
    description: 'Join forces with your friends to hunt down rare bosses!',
  },
  defaultServer: '(any)',
  createGroup: 'Create group',
  groupSettings: 'Group settings',
  mySettings: 'My preferences',
  notificate: 'Notificate',
  apply: 'Apply',
  publicBoard: {
    title: 'Description',
    add: 'Add description',
    edit: 'Edit description',
  },
  privateBoard: {
    title: 'Internal message board',
    add: 'Add message',
    edit: 'Edit message',
  },
  members: 'Members',
  groupApplications: 'Group applications',
  checkHistory: 'Check history',
  logHistory: 'Log history',
  RollAvatar: {
    avatarAlt: 'New group avatar',
    roll: 'Roll',
  },
  CreateGuildDialog: {
    successToast: 'Hunting group created!',
    errorMessage: '{{name}} already exists',
    groupName: 'Group name',
    namePlaceholder: 'Choose a group name',
    privateGroup: 'Private group',
    privateTooltip:
      'A private group can be found, but its members will be hidden',
    exevoProExclusive: '{{exevopro}} exclusive',
    unauthedAlert: 'You must {{login}} to create a hunting group',
    login: 'log in',
    cancel: 'Cancel',
    create: 'Create',
  },
  GuildGrid: {
    searchName: 'Search by name',
    searchPlaceholder: 'Hunting group name',
    server: 'Search by server',
    findGroups: 'Find groups',
    myGroups: 'My groups',
    GuildList: {
      member: 'member',
      members: 'members',
      privateTooltip: 'This is a private hunting group',
      apply: 'Apply',
      emptyState: 'No hunting groups',
    },
  },
  GuildHero: {
    member: 'member',
    members: 'members',
  },
  ApplyDialog: {
    heading: 'Apply to {{guildName}}',
    applyAs: 'Apply as',
    nameError: 'Name length must be between {{min}}-{{max}} characters',
    message: 'Message (optional)',
    messagePlaceholder: "I won't SD any Yetis I swear",
    cancel: 'Cancel',
    submit: 'Submit',
    toast: {
      success: 'Application sent!',
      error: 'You already joined this group!',
    },
  },
  MemberList: {
    private: 'This is a private group',
    role: 'Role',
    name: 'Name',
    admin: 'Admin',
    moderator: 'Moderator',
    self: '(you)',
    ManageUser: {
      changeName: 'Change name',
      addRole: 'Add role',
      leaveGroup: 'Leave group',
      kickMember: 'Kick member',
    },
    ManagingModes: {
      Role: {
        heading: 'Change member role',
        adminMessage: '⚠️ After this operation you will lose Admin status',
        cancel: 'Cancel',
        confirm: 'Confirm',
        successToast: '{{name}} was successfully updated!',
        options: {
          admin: 'Admin',
          moderator: 'Moderator',
          member: 'Member',
        },
      },
      Exclusion: {
        heading: {
          leave: 'Leave hunting group',
          kick: 'Kick hunting group member',
        },
        confirmMessage: {
          leave: 'Are you sure you want to leave {{name}}?',
          kick: 'Are you sure you want to kick {{name}}?',
        },
        cancel: 'Cancel',
        leave: 'Leave',
        kick: 'Kick',
        groupDisbanded: 'Hunting group was disbanded',
        newAdmin: '{{name}} is the new group admin',
      },
      ChangeName: {
        heading: 'Change your name',
        nameInput: 'New name',
        nameError: 'Name length must be between {{min}}-{{max}} characters',
        cancel: 'Cancel',
        confirm: 'Confirm',
        successToast: 'Your name was updated successfully!',
      },
    },
  },
  SettingsDialog: {
    heading: 'Settings',
    enableGroupNotifications: 'Receive notifications from this group',
    receiveNotificationsFor: 'Receive notifications for:',
    cancel: 'Cancel',
    save: 'Save',
    successToast: 'Preferences saved!',
  },
  ApplyList: {
    name: 'Name',
    message: 'Message',
    accept: 'Accept',
    reject: 'Reject',
    rejectToast: 'Application rejected successfully!',
    loading: 'Loading...',
    emptyState: 'No applications',
  },
  EditGuildDialog: {
    heading: 'Edit hunting group',
    guildName: 'Group name',
    guildNamePlaceholder: 'New group name',
    nameError: 'Must be a unique name between {{min}}-{{max}} characters',
    description: 'Description',
    descriptionPlaceholder: 'Add group description',
    messageBoard: 'Message board (only seen by members)',
    messageBoardPlaceholder: 'Add a message to the board',
    privateGroup: 'Private group',
    privateTooltip:
      'A private group can be found, but its members will be hidden',
    exevoProRequired:
      'At least one Exevo Pro group member is required to set a private group',
    goToDocs: 'Check out the {{documentation}}',
    documentation: 'documentation',
    testWebhook: 'Test webhook 🧑‍🔬',
    notificationPosted: 'Notification event was posted!',
    cancel: 'Cancel',
    save: 'Save',
    successToast: 'Group was updated successfully!',
  },
  LogHistory: {
    searchLabel: 'Search',
    searchPlaceholder: 'Search for bosses or members',
    event: 'Event',
    leave: '{{name}} left the group',
    reject: '{{actor}} rejected {{target}} application',
    kick: '{{actor}} kicked {{target}}',
    accept: '{{actor}} approved {{target}} application',
    notification: '{{actor}} sighted a {{boss}}',
    emptyState: 'No log history',
    loadMore: 'Show more',
  },
  CheckHistory: {
    searchLabel: 'Search',
    searchPlaceholder: 'Search for bosses or members',
    event: 'Event',
    checkEntry: '{{member}} checked {{boss}}',
    emptyState: 'No checks',
    loadMore: 'Show more',
  },
  NotificationDialog: {
    heading: 'Notificate group',
    search: 'Search boss',
    emptyState: 'No bosses',
    cancel: 'Cancel',
    send: 'Send notification',
    successToast: 'Notification was sent!',
  },
  CheckedBosses: {
    checkedBosses: 'Checked bosses',
    search: 'Search',
    hideNoChance: 'Hide no chance',
    hideRecentlyChecked: 'Hide recently checked',
    hideBlacklisted: 'Hide my ignored bosses',
    hideRaid: 'Hide raid {{bosses}}',
    hideSharedSpawn: 'Hide shared spawn {{bosses}}',
    details: 'Details',
    notifyGroup: 'Notify group',
    markAsChecked: 'Mark as checked',
    markAsNoChance: 'Mark as no chance',
    unmarkAsNoChance: 'Unmark as no chance',
    bossWasMarked: '{{boss}} was marked!',
    loading: 'Loading...',
    lastTimeChecked: 'Last time checked (by {{member}})',
    fullLastTimeChecked: '{{time}} (by {{member}})',
    justChecked: 'just checked',
    minutesAgo: 'minutes ago',
    hourAgo: 'hour ago',
    hoursAgo: 'hours ago',
    showMore: 'Show more',
  },
  GroupStatistics: {
    heading: 'Group statistics',
    currentMonth: 'Current month',
    pastMonth: 'Last month',
    exportData: 'Export data',
    bosses: 'Bosses',
    members: 'Members',
    checksBy: 'Checks by', // 'checks by bosses/members'
    emptyState: {
      bosses: 'No boss checks',
      members: 'No member checks',
    },
    membersOnly: 'Members only',
    periodicUpdate: 'Statistics are updated periodically',
  },
  ExportDataDialog: {
    heading: 'Monthly check logs',
    date: 'Date',
    export: 'Export',
    exported: 'Exported',
  },
}
