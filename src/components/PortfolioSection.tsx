import React, { useState } from 'react';
import { 
  FolderKanban, 
  ExternalLink, 
  Github, 
  Heart, 
  Plus, 
  Trash2, 
  Edit3, 
  Sparkles, 
  Search,
  Code2,
  CheckCircle2
} from 'lucide-react';
import { PortfolioProject } from '../types';
import { triggerConfetti } from '../utils/audio';

interface PortfolioSectionProps {
  projects: PortfolioProject[];
  onAddProject: (project: PortfolioProject) => void;
  onUpdateProject: (project: PortfolioProject) => void;
  onDeleteProject: (id: string) => void;
  isAdmin: boolean;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  isAdmin,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);

  // Edit / Add Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formStudent, setFormStudent] = useState('');
  const [formClass, setFormClass] = useState('');
  const [formCategory, setFormCategory] = useState<PortfolioProject['category']>('Game Scratch');
  const [formDesc, setFormDesc] = useState('');
  const [formTools, setFormTools] = useState('');
  const [formDemoUrl, setFormDemoUrl] = useState('');
  const [formGithubUrl, setFormGithubUrl] = useState('');
  const [formFeatured, setFormFeatured] = useState(false);

  const categories = ['Semua', 'Game Scratch', 'Aplikasi C#', 'Website', 'Desain Grafis', 'Robotika IoT'];

  const filteredProjects = projects.filter((p) => {
    const matchesCat = selectedCategory === 'Semua' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleLike = (project: PortfolioProject) => {
    const updated = {
      ...project,
      likes: project.hasUserLiked ? project.likes - 1 : project.likes + 1,
      hasUserLiked: !project.hasUserLiked,
    };
    onUpdateProject(updated);
    if (!project.hasUserLiked) {
      triggerConfetti();
    }
  };

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormTitle('');
    setFormStudent('');
    setFormClass('8A');
    setFormCategory('Game Scratch');
    setFormDesc('');
    setFormTools('Scratch 3.0, Pixel Art');
    setFormDemoUrl('https://scratch.mit.edu');
    setFormGithubUrl('');
    setFormFeatured(true);
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    setFormTitle(project.title);
    setFormStudent(project.studentName);
    setFormClass(project.studentClass);
    setFormCategory(project.category);
    setFormDesc(project.description);
    setFormTools(project.toolsUsed.join(', '));
    setFormDemoUrl(project.demoUrl || '');
    setFormGithubUrl(project.githubUrl || '');
    setFormFeatured(project.featured);
    setIsEditModalOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formStudent) return;

    const toolsArray = formTools.split(',').map((t) => t.trim()).filter(Boolean);

    if (editingProject) {
      const updated: PortfolioProject = {
        ...editingProject,
        title: formTitle,
        studentName: formStudent,
        studentClass: formClass,
        category: formCategory,
        description: formDesc,
        toolsUsed: toolsArray,
        demoUrl: formDemoUrl || undefined,
        githubUrl: formGithubUrl || undefined,
        featured: formFeatured,
      };
      onUpdateProject(updated);
    } else {
      const created: PortfolioProject = {
        id: `port-${Date.now()}`,
        title: formTitle,
        studentName: formStudent,
        studentClass: formClass,
        category: formCategory,
        description: formDesc,
        toolsUsed: toolsArray,
        date: '18 Oktober 2026',
        likes: 1,
        hasUserLiked: false,
        demoUrl: formDemoUrl || undefined,
        githubUrl: formGithubUrl || undefined,
        featured: formFeatured,
      };
      onAddProject(created);
      triggerConfetti();
    }

    setIsEditModalOpen(false);
  };

  return (
    <section className="py-16 bg-[#060913] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              <FolderKanban className="w-4 h-4 text-cyan-400" />
              <span>Showcase Digital &amp; Hasil Praktikum Siswa</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Galeri Portofolio Siswa SMP
            </h2>
            <p className="text-slate-400 mt-2 max-w-2xl text-sm sm:text-base">
              Koleksi karya inovatif yang diciptakan oleh siswa IT Club: game edukatif Scratch, utilitas aplikasi C#, proyek web responsif, dan purwarupa robotika IoT.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin ? (
              <button
                onClick={handleOpenAdd}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 shadow-md shadow-cyan-500/20 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Karya Siswa (Guru)</span>
              </button>
            ) : (
              <button
                onClick={handleOpenAdd}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-cyan-300 bg-slate-900 border border-cyan-500/40 hover:bg-slate-800 whitespace-nowrap"
              >
                <Plus className="w-4 h-4 text-cyan-400" />
                <span>Ajukan Karya Saya</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter and Search */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Cari karya / nama siswa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="group rounded-2xl bg-[#090e1c] border border-slate-800/80 hover:border-cyan-500/40 p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/40 flex flex-col justify-between"
            >
              <div>
                {/* Header: Category & Admin actions */}
                <div className="flex items-center justify-between gap-2 text-xs font-mono mb-3">
                  <span className="text-cyan-400 font-semibold">{proj.category}</span>
                  <div className="flex items-center gap-1.5">
                    {isAdmin && (
                      <>
                        <button
                          onClick={() => handleOpenEdit(proj)}
                          title="Edit Karya"
                          className="p-1 rounded text-slate-400 hover:text-cyan-300 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteProject(proj.id)}
                          title="Hapus Karya"
                          className="p-1 rounded text-slate-400 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 
                  onClick={() => setActiveModalProject(proj)}
                  className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer leading-snug"
                >
                  {proj.title}
                </h3>

                {/* Student Author */}
                <div className="mt-2 flex items-center gap-2 text-xs text-purple-300 font-medium">
                  <div className="w-5 h-5 rounded-full bg-purple-900/60 border border-purple-500/40 flex items-center justify-center text-[10px] text-purple-200 font-bold">
                    {proj.studentName.charAt(0)}
                  </div>
                  <span>{proj.studentName} ({proj.studentClass})</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-500 text-[11px] font-mono">{proj.date}</span>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                  {proj.description}
                </p>

                {/* Tools Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {proj.toolsUsed.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Actions: Like & Live Demo Link */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => handleLike(proj)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                    proj.hasUserLiked
                      ? 'bg-rose-950/60 text-rose-300 border border-rose-500/40'
                      : 'text-slate-400 hover:text-rose-300 hover:bg-slate-800/50'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${proj.hasUserLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{proj.likes} Apresiasi</span>
                </button>

                <div className="flex items-center gap-2">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Lihat Source Code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-300 bg-cyan-950/50 border border-cyan-800/50 hover:bg-cyan-900/50 transition-colors"
                    >
                      <span>Lihat Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Project Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-2xl bg-[#090e1c] border border-cyan-500/40 p-6 sm:p-7 shadow-2xl">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
              <span>{activeModalProject.category}</span>
              <span className="text-slate-400">{activeModalProject.date}</span>
            </div>
            
            <h3 className="text-2xl font-bold text-white">{activeModalProject.title}</h3>
            
            <div className="mt-2 text-sm text-purple-300">
              Karya oleh: <strong>{activeModalProject.studentName}</strong> (Kelas {activeModalProject.studentClass})
            </div>

            <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-slate-200 leading-relaxed">
              {activeModalProject.description}
            </div>

            <div className="mt-4">
              <span className="text-xs font-mono text-slate-400">Teknologi / Perangkat yang Digunakan:</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {activeModalProject.toolsUsed.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-mono bg-cyan-950/70 text-cyan-300 border border-cyan-800/50">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => handleLike(activeModalProject)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-rose-300"
              >
                <Heart className={`w-4 h-4 ${activeModalProject.hasUserLiked ? 'fill-rose-500' : ''}`} />
                <span>{activeModalProject.likes} Siswa Menyukai Ini</span>
              </button>

              <button
                onClick={() => setActiveModalProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah / Edit Karya Siswa (Admin / Guru) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#090e1c] border border-cyan-500/50 p-6 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>{editingProject ? 'Edit Portofolio Siswa' : 'Tambah Portofolio Karya Siswa'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">Publikasikan karya inovasi digital siswa ke etalase online sekolah.</p>

            <form onSubmit={handleSaveForm} className="mt-5 space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Judul Karya / Proyek</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: MathQuest Game 2D Scratch"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Nama Siswa Pembuat</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Lengkap Siswa"
                    value={formStudent}
                    onChange={(e) => setFormStudent(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Kelas Siswa</label>
                  <input
                    type="text"
                    placeholder="Contoh: 8A / 7B"
                    value={formClass}
                    onChange={(e) => setFormClass(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Kategori Karya</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as PortfolioProject['category'])}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Game Scratch">Game Scratch</option>
                  <option value="Aplikasi C#">Aplikasi C#</option>
                  <option value="Website">Website</option>
                  <option value="Desain Grafis">Desain Grafis</option>
                  <option value="Robotika IoT">Robotika IoT</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Deskripsi Proyek</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Jelaskan fitur, cara kerja, dan tujuan pembuatan karya ini..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Teknologi / Alat (Pisahkan koma)</label>
                <input
                  type="text"
                  placeholder="Scratch 3.0, C#, Visual Studio, Tailwind CSS"
                  value={formTools}
                  onChange={(e) => setFormTools(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Link Demo (Opsional)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formDemoUrl}
                    onChange={(e) => setFormDemoUrl(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Link GitHub (Opsional)</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={formGithubUrl}
                    onChange={(e) => setFormGithubUrl(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200"
                >
                  Simpan Portofolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
