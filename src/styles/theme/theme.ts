import type { ThemeConfig } from 'antd/lib'

export const themeCustom: ThemeConfig = {
  token: {
    borderRadius: 0,
  },
  components: {
    Layout: {
      colorText: '#FFF',
    },
    Button: {
      borderRadiusLG: 50,
      borderRadiusSM: 50,
      borderRadius: 50,
    },
  },
}
