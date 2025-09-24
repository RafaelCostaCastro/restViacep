// Front/styles.js
export const colors = {
  background: '#181818',
  card: '#23272F',
  text: '#F3F6F9',
  textSecondary: '#A0A6B3',
  primary: '#1976D2',
  danger: '#E53935'
};

export const commonStyles = {
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 12
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 8,
    marginVertical: 6,
    padding: 14
  },
  text: {
    color: colors.text,
    fontSize: 16
  },
  label: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 8
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    marginVertical: 8
  },
  buttonDanger: {
    backgroundColor: colors.danger,
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    marginVertical: 8
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },
  input: {
    backgroundColor: '#23272F',
    color: colors.text,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#2c303c',
    padding: 10,
    marginTop: 4
  }
};
