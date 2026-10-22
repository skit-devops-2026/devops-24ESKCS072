import { useMemo, useState } from "react";
import "./App.css";
import personaHero from "./assets/persona/char1.png";
import personaHeroAlt from "./assets/persona/char2.png";
import personaHeroThird from "./assets/persona/char3.png";
import personaBackdrop from "./assets/persona/mainm2.jpeg";
import personaBackdropAlt from "./assets/persona/mainf.jpeg";
import personaJokerFace from "./assets/persona/jokerface2.png";
import personaCardArt from "./assets/persona/card.png";
import personaSign from "./assets/persona/newsign.png";
import personaIconOne from "./assets/persona/icon1.png";
import personaIconTwo from "./assets/persona/icon2.png";
import personaIconThree from "./assets/persona/icon3.png";

const THEMES = [
  { id: "persona", name: "Persona", kind: "GAME-INSPIRED", icon: "✦", note: "Sharp panels / stylish rebellion", tagline: "STEAL THE SPOTLIGHT.", description: "Your corner is a calling card. Make noise, find your people, and leave a mark on the feed.", nav: ["THE HIDEOUT", "THE NETWORK", "MY DOSSIER", "THEMES"], motion: "snap" },
  { id: "outbreak", name: "Outbreak Protocol", kind: "SURVIVAL HORROR", icon: "⌁", note: "Classified files / eerie terminals", tagline: "CONNECTION IS SURVIVAL.", description: "A survivor's archive for late-night logs, trusted allies, and signals from the outside.", nav: ["SAFE ROOM", "FIELD LOGS", "CASE FILE", "PROTOCOLS"], motion: "signal" },
  { id: "spiderverse", name: "Into the Feed", kind: "COMIC-INSPIRED", icon: "✳", note: "Halftones / comic-book impact", tagline: "YOUR WORLD. YOUR PANEL.", description: "A living comic strip of friends, ideas, photos, and the wonderfully weird stuff in between.", nav: ["THE COVER", "ISSUE FEED", "HERO FILE", "UNIVERSES"], motion: "impact" },
  { id: "construct", name: "The Construct", kind: "SCI-FI FILM-INSPIRED", icon: "⌘", note: "Terminal green / decoded signals", tagline: "WAKE UP YOUR PROFILE.", description: "A simulated digital space for decoded thoughts, chosen connections, and alternate identities.", nav: ["ROOT", "STREAM", "IDENTITY", "SYSTEMS"], motion: "type" },
  { id: "afterhours", name: "Neon Afterhours", kind: "CINEMATIC SCI-FI", icon: "◉", note: "Rainy neon / cinematic drift", tagline: "STAY STRANGE AFTER DARK.", description: "A personal archive glowing somewhere between the last train, a dream, and a city that never sleeps.", nav: ["NIGHT CITY", "TRANSMISSIONS", "ARCHIVE", "FREQUENCIES"], motion: "drift" },
  { id: "nerv", name: "Nerv Interface", kind: "ANIME-INSPIRED", icon: "△", note: "Warning graphics / mission control", tagline: "PERSONALITY: ONLINE.", description: "Your own command deck for status reports, friend signals, and end-of-the-world-level feelings.", nav: ["OPERATIONS", "SIGNALS", "PILOT FILE", "SYSTEM"], motion: "pulse" },
  { id: "webcore", name: "Internet Fever Dream", kind: "Y2K / OLD WEB", icon: "♡", note: "Sticker chaos / glitter / pixel nostalgia", tagline: "WELCOME TO MY LITTLE CORNER.", description: "A maximalist internet bedroom for collecting interests, posting tiny life updates, and decorating everything.", nav: ["HOME PAGE", "FRIEND SPACE", "MY WEBPAGE", "THEME RING"], motion: "float" },
];

const INITIAL_POSTS = [
  { id: 1, name: "mika.exe", handle: "@mikaonline", avatar: "🦋", time: "12 MIN AGO", text: "made my profile look like a glittery computer lab from 2004 and honestly? healing. ✨💿", tags: ["#y2k", "#mycorner"], likes: 24, comments: 8, liked: false },
  { id: 2, name: "pixelghost", handle: "@ghostinbrowser", avatar: "👾", time: "38 MIN AGO", text: "the internet used to feel like exploring someone's bedroom, not walking through a shopping mall.", tags: ["#oldweb", "#webcore"], likes: 41, comments: 12, liked: false },
  { id: 3, name: "luna afterdark", handle: "@lunaisoffline", avatar: "🌙", time: "1 HR AGO", text: "currently listening to the same song for the 17th time. my profile has entered its dramatic era.", tags: ["#currentlylistening", "#emo"], likes: 17, comments: 4, liked: false },
];
const INITIAL_FRIENDS = [
  { id: 1, name: "mika.exe", handle: "@mikaonline", avatar: "🦋", online: true, following: true },
  { id: 2, name: "pixelghost", handle: "@ghostinbrowser", avatar: "👾", online: true, following: false },
  { id: 3, name: "luna afterdark", handle: "@lunaisoffline", avatar: "🌙", online: false, following: false },
  { id: 4, name: "peachbyte", handle: "@peachbyte", avatar: "🍑", online: true, following: true },
];
const INITIAL_PROFILE = { name: "starry eyed", handle: "@starryeyed", bio: "just a person making the internet a little more sparkly ✧", interests: "indie music · digital art · late-night walks", song: "Space Song — Beach House", avatar: "🌟", profileTheme: "follow" };

function SectionHeading({ eyebrow, title, action, onAction }) {
  return <div className="section-heading"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2></div>{action && <button className="text-button" type="button" onClick={onAction}>{action} <span aria-hidden="true">↗</span></button>}</div>;
}
function Avatar({ children, size = "normal" }) {
  return <div className={`avatar avatar-${size}`}>{children}</div>;
}

export default function App() {
  const [themeId, setThemeId] = useState("persona");
  const [activeNav, setActiveNav] = useState(0);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [friends, setFriends] = useState(INITIAL_FRIENDS);
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [composerOpen, setComposerOpen] = useState(false);
  const [composerText, setComposerText] = useState("");
  const [profileEditorOpen, setProfileEditorOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [musicOn, setMusicOn] = useState(false);
  const theme = THEMES.find((item) => item.id === themeId) ?? THEMES[0];
  const profileTheme = profile.profileTheme === "follow" ? theme : THEMES.find((item) => item.id === profile.profileTheme) ?? theme;
  const followingCount = friends.filter((friend) => friend.following).length;
  const filteredFriends = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return friends;
    return friends.filter((friend) => `${friend.name} ${friend.handle}`.toLowerCase().includes(term));
  }, [friends, search]);

  function announce(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  }
  function navigate(index) {
    setActiveNav(index);
    const targets = ["home", "community", "profile", "themes"];
    document.getElementById(targets[index])?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }
  function changeTheme(id) {
    const nextTheme = THEMES.find((item) => item.id === id);
    if (!nextTheme) return;
    setThemeId(id);
    setActiveNav(0);
    announce(`${nextTheme.name} activated ${nextTheme.icon}`);
  }
  function toggleLike(postId) {
    setPosts((current) => current.map((post) => post.id === postId ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) } : post));
  }
  function toggleFollow(friendId) {
    setFriends((current) => current.map((friend) => friend.id === friendId ? { ...friend, following: !friend.following } : friend));
  }
  function publishPost(event) {
    event.preventDefault();
    const text = composerText.trim();
    if (!text) { announce("Write a little something first."); return; }
    const newPost = { id: Date.now(), name: profile.name, handle: profile.handle, avatar: profile.avatar, time: "JUST NOW", text, tags: ["#mycorner"], likes: 0, comments: 0, liked: false };
    setPosts((current) => [newPost, ...current]);
    setComposerText("");
    setComposerOpen(false);
    announce("Your transmission is live.");
  }
  function updateProfile(field, value) {
    setProfile((current) => ({ ...current, [field]: value }));
  }
  async function sharePost(post) {
    const shareText = `${post.name} on mycorner: ${post.text}`;
    try {
      if (navigator.share) await navigator.share({ title: "mycorner post", text: shareText });
      else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(shareText); announce("Post copied to clipboard."); }
      else announce("Sharing isn't supported in this browser.");
    } catch { /* The user may cancel the native share dialog. */ }
  }

  return (
    <div className={`app-shell theme-${theme.id} motion-${theme.motion}`} id="home">
      <div className="ambient ambient-one" aria-hidden="true" /><div className="ambient ambient-two" aria-hidden="true" /><div className="scanline-overlay" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#home" onClick={() => setActiveNav(0)} aria-label="mycorner home"><span className="brand-mark">m✳</span><span>mycorner<span className="brand-period">.</span></span></a>
        <nav className={`main-nav nav-${theme.id}`} aria-label="Theme navigation">
          {theme.nav.map((label, index) => <button className={`nav-link ${activeNav === index ? "active" : ""}`} type="button" key={label} onClick={() => navigate(index)} aria-current={activeNav === index ? "page" : undefined}><span className="nav-index">{String(index + 1).padStart(2, "0")}</span>{label}</button>)}
        </nav>
        <div className="topbar-actions"><label className="search-box"><span aria-hidden="true">⌕</span><input type="search" placeholder="Find your people..." value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Search community members" /></label><button className="top-avatar-button" type="button" onClick={() => setProfileEditorOpen(true)} aria-label="Edit your profile">{profile.avatar}</button></div>
      </header>

      <main className="page-wrap">
        <section className="hero">
          <div className="hero-copy"><div className="status-pill"><span className="status-dot" /> LIVE SYSTEM / COMMUNITY ONLINE</div><p className="hero-kicker">{theme.kind} <span>///</span> MYCORNER UNIVERSE 001</p><h1>{theme.tagline}</h1><p className="hero-description">{theme.description}</p><div className="hero-actions"><button className="button button-primary" type="button" onClick={() => setProfileEditorOpen(true)}>✦ Customize my space</button><button className="button button-secondary" type="button" onClick={() => navigate(1)}>Explore the feed <span aria-hidden="true">↗</span></button></div><div className="hero-social-proof"><div className="mini-avatars" aria-hidden="true"><span>🦋</span><span>👾</span><span>🍓</span><span>🌙</span></div><span><strong>2,408</strong> little corners and counting</span></div></div>
          <div className={`hero-art ${themeId === "persona" ? "persona-artwork-active" : "generic-theme-artwork"}`} aria-label={themeId === "persona" ? "Persona theme artwork" : `${theme.name} theme artwork`}>
            {themeId === "persona" && <div className="persona-art-layers" aria-hidden="true">
              <div className="persona-backdrop-wash" />
              <img className="persona-backdrop persona-backdrop-one" src={personaBackdrop} alt="" />
              <img className="persona-backdrop persona-backdrop-two" src={personaBackdropAlt} alt="" />
              <img className="persona-hero-cutout" src={personaHero} alt="" />
              <img className="persona-character persona-character-two" src={personaHeroAlt} alt="" />
              <img className="persona-character persona-character-three" src={personaHeroThird} alt="" />
              <img className="persona-face-cutout" src={personaJokerFace} alt="" />
              <img className="persona-card-art" src={personaCardArt} alt="" />
              <img className="persona-sign-art" src={personaSign} alt="" />
              <img className="persona-mini-icon persona-mini-icon-one" src={personaIconOne} alt="" />
              <img className="persona-mini-icon persona-mini-icon-two" src={personaIconTwo} alt="" />
              <img className="persona-mini-icon persona-mini-icon-three" src={personaIconThree} alt="" />
              <span className="persona-impact-word impact-word-one">WAKE</span>
              <span className="persona-impact-word impact-word-two">UP!</span>
              <span className="persona-speedline speedline-one" /><span className="persona-speedline speedline-two" />
            </div>}
            <div className="art-stamp stamp-one">{theme.icon}</div><div className="art-stamp stamp-two">MCR<br />001</div><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="hero-poster"><span className="poster-topline">YOUR PROFILE / YOUR UNIVERSE</span><strong>{theme.name}</strong><span className="poster-symbol">{theme.icon}</span><span className="poster-bottomline">EST. RIGHT NOW · ALWAYS ONLINE</span></div><div className="floating-note note-left">NO. 001<br />YOU ARE HERE</div><div className="floating-note note-right">MAKE IT<br />WEIRD ↗</div></div><span className="hero-side-label">SCROLL TO EXPLORE / SCROLL TO EXPLORE /</span>
        </section>

        <section className="theme-section" id="themes"><SectionHeading eyebrow="SELECT YOUR REALITY" title="Seven worlds. One social universe." action="Theme index" onAction={() => announce("You are viewing all seven starter themes.")} /><div className="theme-grid">{THEMES.map((item, index) => <button type="button" key={item.id} className={`theme-card theme-card-${item.id} ${themeId === item.id ? "selected" : ""}`} onClick={() => changeTheme(item.id)} aria-pressed={themeId === item.id}><span className="theme-card-number">0{index + 1} / {item.kind}</span><span className="theme-card-icon">{item.icon}</span><span className="theme-card-name">{item.name}</span><span className="theme-card-note">{item.note}</span><span className="theme-card-arrow" aria-hidden="true">↗</span></button>)}</div></section>

        <div className="content-grid"><div className="main-column">
          <section className={`profile-card panel profile-world-${profileTheme.id}`} id="profile"><div className="panel-topline"><span className="eyebrow">USER FILE / YOUR LITTLE UNIVERSE</span><button className="icon-button" type="button" onClick={() => setProfileEditorOpen(true)} aria-label="Customize profile">✎</button></div><div className="profile-main"><div className="profile-avatar-wrap"><Avatar size="large">{profile.avatar}</Avatar><span className="online-badge" title="Online now" /></div><div className="profile-details"><div className="profile-name-row"><h2>{profile.name}</h2><span className="profile-label">YOUR SPACE</span></div><p className="profile-handle">{profile.handle}</p><p className="profile-bio">{profile.bio}</p><div className="interest-line"><span>♡</span> {profile.interests}</div><div className="profile-meta"><span><strong>{followingCount + 18}</strong> friends</span><span><strong>06</strong> profile views today</span></div></div></div><div className="profile-bottom"><div className="currently-playing"><span className="music-note">♫</span><span><small>CURRENTLY OBSESSED WITH</small><strong>{profile.song}</strong></span></div><button className="button button-small button-primary" type="button" onClick={() => setProfileEditorOpen(true)}>Edit my space ↗</button></div></section>

          <section className="feed-section" id="community"><SectionHeading eyebrow="COMMUNITY TRANSMISSIONS" title="The little feed" action="Write a post +" onAction={() => setComposerOpen((open) => !open)} />{composerOpen && <form className="composer panel" onSubmit={publishPost}><div className="composer-header"><Avatar>{profile.avatar}</Avatar><div><strong>Leave a little trace</strong><p>What's happening in your corner?</p></div></div><textarea value={composerText} onChange={(event) => setComposerText(event.target.value)} placeholder="Tell your internet people something..." maxLength={500} rows={3} aria-label="Write a post" autoFocus /><div className="composer-footer"><span>{composerText.length}/500</span><button className="button button-primary button-small" type="submit">Transmit post ✦</button></div></form>}
            <div className="feed-list">{posts.map((post) => <article className="post-card panel" key={post.id}><div className="post-header"><Avatar>{post.avatar}</Avatar><div className="post-author"><strong>{post.name}</strong><span>{post.handle} <i>·</i> {post.time}</span></div><button className="icon-button post-more" type="button" onClick={() => announce("More post options are a future feature.")} aria-label={`More options for ${post.name}'s post`}>···</button></div><p className="post-text">{post.text}</p><div className="post-tags">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="post-actions"><button type="button" className={`post-action ${post.liked ? "is-liked" : ""}`} onClick={() => toggleLike(post.id)} aria-pressed={post.liked}><span aria-hidden="true">{post.liked ? "♥" : "♡"}</span> {post.likes}</button><button type="button" className="post-action" onClick={() => announce("Comments will be added in a later stage.")}><span aria-hidden="true">▢</span> {post.comments} comments</button><button type="button" className="post-action post-share" onClick={() => sharePost(post)}><span aria-hidden="true">↗</span> Share</button></div></article>)}</div>
          </section>
        </div>
        <aside className="sidebar"><section className="music-card panel"><div className="sidebar-heading"><span className="eyebrow">ON REPEAT / AUDIO DECK</span><span className="tiny-equalizer" aria-hidden="true"><i /><i /><i /></span></div><div className={`album-art ${musicOn ? "is-playing" : ""}`}><div className="album-sun" /><div className="album-moon">☾</div><div className="album-stars">✦ ✧ ✦</div><span>late night<br />FM</span></div><div className="track-info"><strong>Space Song</strong><span>Beach House · Depression Cherry</span></div><div className="music-controls"><button type="button" aria-label="Previous track" onClick={() => announce("Track selection is a future feature.")}>↶</button><button type="button" className="play-button" aria-label={musicOn ? "Pause visualizer" : "Play visualizer"} onClick={() => setMusicOn((playing) => !playing)}>{musicOn ? "Ⅱ" : "▶"}</button><button type="button" aria-label="Next track" onClick={() => announce("Track selection is a future feature.")}>↷</button></div><div className="music-progress"><span className={musicOn ? "progress-active" : ""} /></div><p className="music-disclaimer">{musicOn ? "Visualizer on · no audio source connected" : "Visual player prototype · no audio yet"}</p></section>
          <section className="friends-card panel"><SectionHeading eyebrow="ALLIES / PEOPLE YOU MAY LIKE" title="Find your people" action="Directory" onAction={() => announce("The full people directory is a future feature.")} /><div className="friend-list">{filteredFriends.map((friend) => <div className="friend-row" key={friend.id}><div className="friend-avatar-wrap"><Avatar>{friend.avatar}</Avatar><span className={`friend-status ${friend.online ? "online" : ""}`} /></div><div className="friend-info"><strong>{friend.name}</strong><span>{friend.handle}</span></div><button type="button" className={`follow-button ${friend.following ? "following" : ""}`} onClick={() => toggleFollow(friend.id)} aria-pressed={friend.following} aria-label={`${friend.following ? "Unfollow" : "Follow"} ${friend.name}`}>{friend.following ? "✓" : "+"}</button></div>)}{filteredFriends.length === 0 && <p className="empty-search">No little corners found. Try another name.</p>}</div><button className="directory-button" type="button" onClick={() => announce("More internet people are on their way.")}>Explore the directory <span>↗</span></button></section>
          <section className="guestbook-card"><div className="guestbook-sticker">✎</div><p className="eyebrow">OLD WEB / NEW FEELINGS</p><h3>Leave a little<br /><span>love note.</span></h3><p>Guestbooks are better than likes. Let's bring them back.</p><button className="button button-dark" type="button" onClick={() => announce("Guestbooks are planned for the next social-feature stage.")}>Sign a guestbook ↗</button><span className="guestbook-doodle" aria-hidden="true">♡ ✧ ♡</span></section><div className="now-playing-note"><span className="note-icon">✦</span><p><strong>YOU'RE RIGHT ON TIME</strong><br />The internet is more fun when it's yours.</p></div></aside></div>

        <footer className="footer"><a className="brand footer-brand" href="#home" onClick={() => setActiveNav(0)}><span className="brand-mark">m✳</span><span>mycorner<span className="brand-period">.</span></span></a><p>Made of pixels, personality & a little bit of nostalgia.</p><div className="footer-links"><button type="button" onClick={() => announce("About mycorner — a little corner for everyone.")}>About</button><button type="button" onClick={() => announce("Community guidelines are planned.")}>Community</button><button type="button" onClick={() => announce("Privacy information will be available soon.")}>Privacy</button><button type="button" onClick={() => announce("More support is coming soon.")}>Help</button></div><span className="copyright">© 2026 MYCORNER INTERNET CLUB ✧</span></footer>
      </main>

      {profileEditorOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setProfileEditorOpen(false); }}><section className="profile-modal panel" role="dialog" aria-modal="true" aria-labelledby="editor-title"><div className="modal-heading"><div><p className="eyebrow">MAKE IT YOURS</p><h2 id="editor-title">Edit your little corner</h2></div><button className="icon-button" type="button" onClick={() => setProfileEditorOpen(false)} aria-label="Close profile editor">×</button></div><div className="modal-preview"><Avatar size="large">{profile.avatar}</Avatar><div><strong>{profile.name || "your name here"}</strong><span>{profile.handle}</span><p>{profile.bio || "Your bio will show up here..."}</p></div></div><label className="field-label">Display name<input value={profile.name} maxLength={32} onChange={(event) => updateProfile("name", event.target.value)} /></label><label className="field-label">Avatar emoji<input value={profile.avatar} maxLength={4} onChange={(event) => updateProfile("avatar", event.target.value)} /></label><label className="field-label">Bio<textarea value={profile.bio} maxLength={160} rows={3} onChange={(event) => updateProfile("bio", event.target.value)} /></label><label className="field-label">Interests<input value={profile.interests} maxLength={100} onChange={(event) => updateProfile("interests", event.target.value)} /></label><label className="field-label">Favorite song<input value={profile.song} maxLength={100} onChange={(event) => updateProfile("song", event.target.value)} /></label><label className="field-label">Your profile theme<select value={profile.profileTheme} onChange={(event) => updateProfile("profileTheme", event.target.value)}><option value="follow">Follow platform theme</option>{THEMES.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label><div className="modal-footer"><span>Changes update live in this prototype.</span><button className="button button-primary" type="button" onClick={() => { setProfileEditorOpen(false); announce("Your space has been updated."); }}>Save my space</button></div></section></div>}
      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  );
}
