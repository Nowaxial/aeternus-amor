// src/components/Valentine.jsx
import { useEffect, useRef } from 'react';
import {
	Title,
	Text,
	Box,
	Grid,
	useMantineTheme,
	useMantineColorScheme,
	Container
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import './Valentine.css';

const Valentine = () => {
	const theme = useMantineTheme();
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
	const { colorScheme } = useMantineColorScheme();
	const isDark = colorScheme === 'dark';
	const messageRef = useRef(null);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const valentine = urlParams.get('valentine');
		const message = urlParams.get('message');

		if (valentine) {
			document.getElementById('valentine').innerText = valentine;
		}
		if (message) {
			document.getElementById('message').innerText = message;
		}

		const randomInt = (n) => Math.floor(Math.random() * n);
		document.getElementById('dynamic').innerText = `
      @keyframes spin {
        0% {
          margin-top: 2vh;
          opacity: 0;
        }
        20% {
          opacity:1.0;
          margin-top: 0vh;
          margin-left: 0vw;
          transform: rotate(${randomInt(90)}deg);
        }
        100% {
          opacity: 0.4;
          margin-top: 100vh;
          margin-left: ${randomInt(4)}vw;
          transform: rotate(1080deg); 
        }
      };
    `;

		let numberOfHearts = 45;
		while (numberOfHearts--) {
			const heartDiv = document.createElement('div');
			heartDiv.classList.add('heart');
			heartDiv.style = `animation: spin ${randomInt(14) + 6}s ease-in infinite;
                        top: ${randomInt(40)}vh;
                        left: ${randomInt(100)}vw;
                        font-size: ${randomInt(40) + 20}px;
                        color: ${['#d00', '#e66', '#fcc'][randomInt(3)]};`;
			heartDiv.textContent = ['\u2661', '\u2665'][randomInt(2)];
			document.getElementById('falling-hearts').appendChild(heartDiv);
		}
	}, []);

	useEffect(() => {
		const text = [
			'Du gör mig lycklig!',
			'Du får mig alltid att le',
			'Min vardag vore tom utan dig',
			'Jag älskar din personlighet och ditt skratt',
			'Jag älskar hur du tittar på mig',
			'Jag älskar tiden vi tillbringar med varandra',
			'Du är den bästa mamman till Lou & Oliver',
			'Jag uppskattar allt du gör för mig/oss',
			'Jag älskar dig mer & mer för var dag som går',
			'Jag vill utvecklas med dig',
			'Du kommer alltid vara min "Queen Bee"',
			'Du finns alltid i mitt hjärta'
		];

		let counter = 0;
		const intervalId = setInterval(() => {
			messageRef.current.classList.add('text-fade');

			setTimeout(() => {
				messageRef.current.innerHTML = text[counter];
				messageRef.current.classList.remove('text-fade');
				messageRef.current.classList.add('text-show');
			}, 1000);

			counter++;

			if (counter >= text.length) {
				counter = 0;
			}
		}, 5000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: isDark ? theme.colors.dark[7] : theme.colors.gray[0],
				padding: isMobile ? '1rem' : '2rem',
			}}>
			<Grid gutter='xl' justify='center' align='center'>
				<Grid.Col span={12}>
					<Box
						id='falling-hearts'
						sx={{
							position: 'fixed',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							pointerEvents: 'none',
						}}
					/>
					<Box
						sx={{
							textAlign: 'center',
							zIndex: 1,
							position: 'relative',
						}}>
						<Title
							order={1}
							sx={{
								fontSize: isMobile ? '2rem' : '3rem',
								color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
							}}>
							Happy Valentine&apos;s Day!
							<br />
							<Text
								span
								sx={{
									display: 'block',
									fontSize: isMobile ? '1.5rem' : '2rem',
									color: theme.colors.red[6],
								}}>
								Will you
							</Text>
							<Text
								span
								sx={{
									display: 'block',
									fontSize: isMobile ? '1.5rem' : '2rem',
									color: theme.colors.yellow[6],
								}}>
								Bee my
							</Text>
							<Text
								span
								sx={{
									display: 'block',
									fontSize: isMobile ? '1.5rem' : '2rem',
									color: theme.colors.pink[6],
								}}>
								valentine?
							</Text>
						</Title>
						<Container className='wrapper'>
						<Box
							sx={{
								marginTop: '2rem',
								textAlign: 'center',
							}}>
							
							<Box
								className='bee'
								sx={{
									position: 'relative',
									width: '100px',
									height: '100px',
									margin: '0 auto',
								}}>
								<Box
									className='bee-body'
									sx={{
										position: 'relative',
										width: '100%',
										height: '100%',
										margin: '0 auto',
									}}>
									<Box className='blink' />
									<Box className='mouth' />
									<Box className='antenae' />
									<Box className='bee-left' />
									<Box className='bee-right' />
								</Box>
							</Box>
							<Box
								className='shadow'
								sx={{
									marginTop: '1rem',
									position: 'absolute',
									left: '50%',
									transform: 'translateX(-50%)',
									width: isMobile ? 60 : 80,
									height: isMobile ? 8 : 12,
									borderRadius: '50%',
									backgroundColor: isDark
										? theme.colors.dark[3]
										: theme.colors.gray[5],
									opacity: 0.6,
									filter: 'blur(2px)',
								}}
							/>
						</Box>
						</Container>
						
						<Title
							order={2}
							sx={{
								fontSize: isMobile ? '1.25rem' : '1.5rem',
								color: isDark ? theme.colors.gray[0] : theme.colors.dark[7],
								marginTop: '2rem',
							}}>
							Till <span id='valentine'>min älskade fru Isabell</span>:
							<br />
							<Text
								span
								sx={{
									fontSize: isMobile ? '1rem' : '1.25rem',
									color: theme.colors.red[6],
								}}>
								<span ref={messageRef} id='message'></span>
							</Text>
						</Title>
					</Box>
				</Grid.Col>
			</Grid>
			<style id='dynamic'></style>
		</Box>
	);
};
export default Valentine;
