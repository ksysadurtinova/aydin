import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { usersAPI } from '../utils/api';
import Layout from '../components/Layout';
import toast from 'react-hot-toast';

export default function Settings() {
  const { user, logout } = useAuthStore();
  const [interests, setInterests] = useState<string[]>(user?.interests || []);
  const [loading, setLoading] = useState(false);

  const availableInterests = ['Music', 'Tech', 'Sports', 'Arts', 'Food', 'Education'];

  const handleInterestToggle = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await usersAPI.updateProfile({ interests });
      toast.success('Settings updated');
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Settings
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Profile
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <p className="text-gray-900 dark:text-white">{user?.email}</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Interests
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableInterests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                    interests.includes(interest)
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={logout}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}