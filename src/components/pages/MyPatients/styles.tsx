import { shade } from 'polished';
import styled from 'styled-components';

export const MyPatientsContainer = styled.div`

	main {
		
		margin: 2rem;
		
		> h1 {
			color: ${({ theme }) => theme.colors.primary.main};
			margin-bottom: 2.5rem;
		}
		
		.patients-container {
			margin-top: 2.5rem;
			border: 5px solid ${({ theme }) => theme.colors.primary.main};
			border-radius: 8px;
			overflow-y: auto;
			height: 50vh;
		}

		.patients-list {
			
			display: flex;
			flex-wrap: wrap;

			li {
				margin: 0.5rem;
				text-align: center;
				max-width: 11rem;

				.patient-list-thumbnail {
					cursor: pointer;
					width: 11rem;
					height: 11rem;
				
					display: flex;
					justify-content: center;
					align-items: center;
					
					background-color: ${({ theme }) => theme.colors.primary.main};
					color: ${({ theme }) => theme.colors.secondary.main};
					border-radius: 8px;

					margin-bottom: 0.5rem;

					transition: background-color 0.25s;
					&:hover {
						background-color: ${({ theme }) => shade(0.15, theme.colors.primary.main)}
					}
				}
			}	
		}
	}
`;