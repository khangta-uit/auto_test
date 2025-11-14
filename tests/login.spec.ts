import { test, expect } from '../fixtures/pomFixture';
import { AiHelper } from '../utils/AiHelper';

test('Login with AI-generated data', async ({ loginPage, page }) => {
   
    const aiUser = await AiHelper.generateSmartTestData('A professional corporate username, single word, no special characters');
    
    
    const aiPass = await AiHelper.generateSmartTestData('A complex password with at least 12 characters including symbols');

    console.log(`Test Data -> User: ${aiUser} | Pass: ${aiPass}`);

    await loginPage.navigate();
    await loginPage.performLogin(aiUser, aiPass);

    const errorMsg = page.locator('#flash');
    await expect(errorMsg).toBeVisible();
    
    const textError = await errorMsg.textContent();
    if (textError) {
        console.log("--- Triggering AI Error Analysis ---");
        await AiHelper.analyzeError(textError);
    }
});