import { createSignal, onMount, createEffect, Show } from 'solid-js';
import { createEvent, supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-solid';
import { ThemeSupa } from '@supabase/auth-ui-shared';

function App() {
  const [user, setUser] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal('login');
  const [description, setDescription] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [generatedCode, setGeneratedCode] = createSignal(null);

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setCurrentPage('homePage');
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentPage('homePage');
      } else {
        setUser(null);
        setCurrentPage('login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentPage('login');
  };

  const handleGenerateCode = async () => {
    if (!description()) return;
    setLoading(true);
    try {
      const prompt = `Generate a simple HTML and CSS code for a website according to the following description: ${description()}. Return the code in JSON format with "html" and "css" properties.`;
      const result = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'json'
      });
      setGeneratedCode(result);
    } catch (error) {
      console.error('Error generating code:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-gray-100 p-4">
      <Show
        when={currentPage() === 'homePage'}
        fallback={
          <div class="flex items-center justify-center min-h-screen">
            <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
              <h2 class="text-3xl font-bold mb-6 text-center text-purple-600">Sign in with ZAPT</h2>
              <a
                href="https://www.zapt.ai"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500 hover:underline mb-6 block text-center"
              >
                Learn more about ZAPT
              </a>
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={['google', 'facebook', 'apple']}
                magicLink={true}
                showLinks={false}
                view="magic_link"
              />
            </div>
          </div>
        }
      >
        <div class="max-w-4xl mx-auto h-full">
          <div class="flex justify-between items-center mb-8">
            <h1 class="text-4xl font-bold text-purple-600">Website Source Code Generator</h1>
            <button
              class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-bold mb-4">Describe the website you want to generate</h2>
            <textarea
              rows="5"
              value={description()}
              onInput={(e) => setDescription(e.target.value)}
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
              placeholder="Enter your website description here..."
            />
            <button
              onClick={handleGenerateCode}
              class={`mt-4 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
                loading() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading()}
            >
              {loading() ? 'Generating...' : 'Generate Code'}
            </button>
          </div>
          <Show when={generatedCode()}>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-2xl font-bold mb-4">Generated Code</h2>
              <div class="mb-4">
                <h3 class="text-xl font-semibold mb-2">HTML</h3>
                <pre class="bg-gray-100 p-4 rounded-lg overflow-auto">
                  <code>{generatedCode().html}</code>
                </pre>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">CSS</h3>
                <pre class="bg-gray-100 p-4 rounded-lg overflow-auto">
                  <code>{generatedCode().css}</code>
                </pre>
              </div>
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
}

export default App;