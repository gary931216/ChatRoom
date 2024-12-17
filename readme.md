# ESP32 機器人聊天室伺服器

這是一個基於 Node.js 和 WebSocket 的聊天室應用，主要用於與 ESP32 機器人進行控制通信。用戶可以透過 Web 瀏覽器設定暱稱並進入聊天室，並且可以進行簡單的控制指令發送。

## 安裝與設定

### 1. 克隆專案

首先，您需要從 GitHub 上克隆專案，或是將專案檔案複製到您的本地端。

```bash
git clone <專案倉庫 URL>
cd <專案資料夾>
```
### 2. 安裝所需套件

安裝專案所需的 Node.js 套件。在專案根目錄下執行以下命令：

```bash
npm install
```
### 3. 生成 SSL 憑證（僅限 HTTPS）

由於這個伺服器使用 HTTPS 和 WebSocket，您需要生成 SSL 憑證來確保安全連線。請遵循以下步驟使用 `openssl` 來生成憑證：

1. 開啟命令行，然後執行以下命令生成私鑰和憑證。

    ```bash
    openssl genpkey -algorithm RSA -out server-key.pem
    openssl req -new -key server-key.pem -out server.csr
    openssl x509 -req -days 365 -in server.csr -signkey server-key.pem -out server-cert.pem
    ```

2. 在執行 `openssl req` 這一步時，您將需要提供一些資料，請根據以下範本填寫：

   - **國家代碼 (Country Name)**: TW
   - **州或省 (State or Province Name)**: Taipei
   - **城市名稱 (Locality Name)**: Taipei
   - **組織名稱 (Organization Name)**: (可以留空或填寫您自己的名稱)
   - **組織單位名稱 (Organizational Unit Name)**: (可以留空)
   - **通用名稱 (Common Name)**: localhost
   - **電子郵件地址 (Email Address)**: (可以留空)

3. 生成完成後，您會在專案資料夾中看到 `server-key.pem` 和 `server-cert.pem` 兩個文件，這些文件將用於伺服器設定中。

### 4. 啟動伺服器

所有設定完成後，您可以使用以下命令來啟動伺服器：

```bash
node server.js
```
伺服器將會啟動並監聽 https://localhost:8000

### 5. 訪問前端
index.html