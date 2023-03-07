export default {
  Meta: {
    title: 'Hunting Groups',
    description: 'Join forces with your friends to hunt down rare bosses!',
  },
  defaultServer: '(any)',
  createGroup: 'Create group',
  RollAvatar: {
    avatarAlt: 'New guild avatar',
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
}
