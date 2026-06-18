# AutoCare 🔧
Aplicativo mobile para controle de manutenção veicular, com foco em usuários que nem sempre têm acesso à internet.

## 📱 Telas
<p align="center">
  <img src="./assets/screenshots/home.png" width="18%" alt="Home" />
  <img src="./assets/screenshots/add-vehicle.png" width="18%" alt="Adicionar veículo" />
  <img src="./assets/screenshots/details.png" width="18%" alt="Detalhes" />
  <img src="./assets/screenshots/update-km.png" width="18%" alt="Atualizar KM" />
  <img src="./assets/screenshots/add-maintenance.png" width="18%" alt="Adicionar manutenção" />
</p>

---

## 💡 Sobre o projeto
O AutoCare nasceu de um problema real: muitos motoristas, especialmente em regiões com acesso limitado à internet, perdem o controle das manutenções do veículo por falta de uma ferramenta simples e offline.

O app permite registrar veículos, acompanhar o status da troca de óleo e visualizar o histórico de manutenções — tudo sem depender de conexão.

---

## 🏗️ Decisões técnicas

### Offline-first com SQLite
Os dados são armazenados localmente com `expo-sqlite`, garantindo funcionamento completo sem internet. A escolha do SQLite sobre o AsyncStorage foi intencional: suporta queries relacionais (veículos → manutenções com foreign key), é mais performático e está preparado para crescer junto com o app.

A arquitetura já está preparada para sincronização com backend — quando o usuário estiver online, os dados locais serão enviados para a nuvem.

### Padrão de arquitetura
- `src/database/` — inicialização do banco e repositories (acesso a dados)
- `src/utils/` — funções puras reutilizáveis
- `src/types/` — tipagem centralizada
- `src/screens/` — telas da aplicação, responsáveis apenas por renderizar

### Status de manutenção
O status é calculado com base no KM restante para a próxima troca:
- ✅ **Em dia** — mais de 500 km restantes
- 🟠 **Próximo da troca** — menos de 500 km restantes
- 🔴 **Troca vencida** — KM ultrapassado

---

## 🚀 Tecnologias
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) — banco de dados local
- [React Navigation](https://reactnavigation.org/) — navegação entre telas
- [Jest](https://jestjs.io/) — testes automatizados
- [EAS Build](https://docs.expo.dev/build/introduction/) — build e deploy na nuvem
- TypeScript

---

## 🧪 Testes

O projeto conta com **47 testes automatizados** divididos em três camadas:

### Unitários — `src/utils/`
Cobrem todas as funções puras do projeto:
- Cálculo de KM restante e status de manutenção
- Formatação de datas e KM
- Filtros e ordenação de manutenções por tipo

### Integração — `src/database/`
Testam a camada de dados com banco SQLite em memória (`better-sqlite3`):
- `vehicleRepository` — save, get, update, delete
- `maintenanceRepository` — save, get por veículo, isolamento entre veículos

### Componentes — `src/components/`
Testam renderização e interações dos componentes de UI:
- `Card`, `AddButton`, `DetailRow`, `SectionHeader`, `SelectButton`

```bash
npm test
```

---

## ⚙️ CI/CD
O projeto utiliza **GitHub Actions + EAS Build** para automatizar testes, build e publicação na Play Store.

O pipeline é dividido em dois jobs:
- **test** — roda em todo push e Pull Request para `main`. Executa os 47 testes (unitários, integração e componentes) com Jest.
- **build** — roda apenas em push para `main`, após os testes passarem. Builda o app via EAS e publica na Play Store.

Essa separação garante que código com testes quebrados nunca chegue a gerar um build.

---

## ▶️ Como rodar localmente
```bash
# Clone o repositório
git clone https://github.com/coutojeferson/autocare.git

# Instale as dependências
cd autocare
npm install

# Inicie o projeto
npx expo start
```

> Requisitos: Node.js 18+, Expo Go instalado no celular ou emulador Android/iOS configurado.

---

## 🔮 Próximos passos
- [x] Testes de integração com SQLite
- [x] Testes de componentes
- [ ] Backend para sincronização dos dados quando online
- [ ] Suporte a outros tipos de manutenção (freios, pneus, filtros)
- [ ] Notificações locais quando a troca estiver próxima
- [ ] Publicação na App Store

---

## 👨‍💻 Autor
Feito por [Jeferson Couto](https://github.com/coutojeferson)
